import React from 'react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { paths } from '../../../Common/constants/Paths'
import AuthService from '../../services/AuthService'
import AuthStore from '../../stores/AuthStore'
import strings from './../../i18n/strings.json'
import loginAPIResponse from './../../fixtures/login-api-response.json'
import { LOGIN_PATH } from '../../constants/Paths'
import { LoginFormRoute } from './LoginFormRoute'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))
describe('loginRoute tests', () => {
   let authAPI
   let authStore
   let username = 'test-user'
   let password = 'test-password'
   const { usernamePlaceholder, passwordPlaceholder } = strings.login

   beforeEach(() => {
      authAPI = new AuthService()
      authStore = new AuthStore(authAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should render username empty error message', () => {
      const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <LoginFormRoute authStore={authStore} />
         </Router>
      )
      const loginButton = getByRole('button', { name: 'Login' })

      fireEvent.click(loginButton)

      getByText(/can't be empty/i)
   })

   it('should render password empty error', () => {
      const { getByText, getByRole, getByPlaceholderText } = render(
         <Router history={createMemoryHistory()}>
            <LoginFormRoute authStore={authStore} />
         </Router>
      )
      const usernameField = getByPlaceholderText(usernamePlaceholder)
      const loginButton = getByRole('button', { name: 'Login' })

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.click(loginButton)

      getByText(/can't be empty/i)
   })

   it('should test LoginForm route failure state', () => {
      const { getByText, getByRole, getByPlaceholderText } = render(
         <Router history={createMemoryHistory()}>
            <LoginFormRoute authStore={authStore} />
         </Router>
      )

      const usernameField = getByPlaceholderText(usernamePlaceholder)
      const passwordField = getByPlaceholderText(passwordPlaceholder)
      const loginButton = getByRole('button', { name: 'Login' })

      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('Network Error'))
      }).catch()

      const mockLoginAPI = jest.fn()
      mockLoginAPI.mockReturnValue(mockFailurePromise)
      authAPI.getLoginAPI = mockLoginAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(loginButton)

      waitFor(() => {
         getByText(/Network Error/i)
      })
   })

   it('should render login route success state', () => {
      const history = createMemoryHistory()
      const route = LOGIN_PATH
      history.push(route)

      const {
         getByPlaceholderText,
         getByRole,
         getByTestId,
         queryByRole
      } = render(
         <Provider authStore={authStore}>
            <Router history={history}>
               <Route path={LOGIN_PATH}>
                  <LoginFormRoute />
               </Route>
               <Route path={paths.dashboard}>
                  <LocationDisplay />
               </Route>
            </Router>
         </Provider>
      )

      const usernameField = getByPlaceholderText(usernamePlaceholder)
      const passwordField = getByPlaceholderText(passwordPlaceholder)
      const loginButton = getByRole('button', { name: 'Login' })

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(loginAPIResponse.admin)
      })

      const mockLoginAPI = jest.fn()
      mockLoginAPI.mockReturnValue(mockSuccessPromise)
      authAPI.getLoginAPI = mockLoginAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(loginButton)

      waitFor(() => {
         expect(
            queryByRole('button', { name: 'Login' })
         ).not.toBeInTheDocument()
         expect(getByTestId('location-display')).toHaveTextContent(
            paths.dashboard
         )
      })
   })
})
