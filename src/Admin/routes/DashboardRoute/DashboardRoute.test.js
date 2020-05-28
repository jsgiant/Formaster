import React from 'react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import formsData from './../../fixtures/forms-data.json'
import loginAPIResponse from './../../../Authentication/fixtures/login-api-response.json'
import AuthService from '../../../Authentication/services/AuthService'
import AuthStore from '../../../Authentication/stores/AuthStore'
import GetFormsAPI from '../../services/FormsService/GetFormsAPI'
import FormStore from '../../stores/FormStore'
import { DashboardRoute } from './DashboardRoute'
import { paths } from '../../../constants/Paths'
import { LOGIN_PATH } from '../../../Authentication/constants/Paths'

const LoginDisplay = withRouter(({ location }) => (
   <div data-testid='login-display'>{location.pathname}</div>
))

describe('dashboard route tests', () => {
   let authAPI
   let authStore
   let getFormsAPI
   let formStore

   beforeEach(() => {
      authAPI = new AuthService()
      authStore = new AuthStore(authAPI)
      getFormsAPI = new GetFormsAPI()
      formStore = new FormStore(getFormsAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test logout button', () => {
      const history = createMemoryHistory()
      const route = paths.dashboard
      history.push(route)
      const { getByTestId } = render(
         <Provider authStore={authStore} formStore={formStore}>
            <Router>
               <Route path={paths.dashboard}>
                  <DashboardRoute history={history} />
               </Route>
               <Route path={LOGIN_PATH}>
                  <LoginDisplay />
               </Route>
            </Router>
         </Provider>
      )

      const mockLoginSuccessPromise = new Promise(function(resolve, reject) {
         resolve(loginAPIResponse.admin)
      })

      const mockFormsSuccessPromise = new Promise(function(resolve, reject) {
         resolve(formsData)
      })

      const mockLoginAPI = jest.fn()
      mockLoginAPI.mockReturnValue(mockLoginSuccessPromise)
      authAPI.getLoginAPI = mockLoginAPI

      const mockGetFormsAPI = jest.fn()
      mockGetFormsAPI.mockReturnValue(mockFormsSuccessPromise)
      getFormsAPI.getFormsAPI = mockGetFormsAPI

      fireEvent.click(getByTestId('logout-btn'))

      waitFor(() => {
         expect(getByTestId('logout-btn')).not.toBeInTheDocument()
         expect(getByTestId('login-display')).toHaveTextContent(LOGIN_PATH)
      })
   })
})
