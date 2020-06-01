import React from 'react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { render, fireEvent, waitFor, getByTestId } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import AuthService from '../../../Authentication/services/AuthService'
import AuthStore from '../../../Authentication/stores/AuthStore'
import { paths } from '../../../Common/constants/Paths'
import { LOGIN_PATH } from '../../../Authentication/constants/Paths'

import formsData from '../../fixtures/forms-data.json'
import FormsAPI from '../../services/FormsService/FormsAPI'
import FormStore from '../../stores/FormStore'

import DashboardRoute from './DashboardRoute'

const LoginDisplay = withRouter(({ location }) => (
   <div data-testid='login-display'>LoginForm</div>
))

describe('dashboard route tests', () => {
   let authAPI
   let authStore
   let formsAPI
   let formStore
   const history = createMemoryHistory()

   beforeEach(() => {
      authAPI = new AuthService()
      authStore = new AuthStore(authAPI)
      formsAPI = new FormsAPI()
      formStore = new FormStore(formsAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   // it('should test get forms failure state', async () => {
   //    const { getAByTestId } = render(
   //       <Router history={history}>
   //          <DashboardRoute authStore={authStore} formStore={formStore} />
   //       </Router>
   //    )

   //    const mockFailurePromise = new Promise(function(resolve, reject) {
   //       reject(new Error('error'))
   //    }).catch()

   //    const mockGetFormsAPI = jest.fn()
   //    mockGetFormsAPI.mockReturnValue(mockFailurePromise)
   //    formsAPI.formsAPI = mockGetFormsAPI

   //    waitFor(() => {
   //       expect(getByText(/Something went wrong/i)).toBeInTheDocument()
   //       expect(queryByRole('button', { name: 'Retry' })).toBeInTheDocument()
   //       expect(getByTestId('test-loader')).not.toBeInTheDocument()
   //    })
   // })

   it('should test get forms loading state', async () => {
      const { getAByTestId } = render(
         <Router history={history}>
            <DashboardRoute authStore={authStore} formStore={formStore} />
         </Router>
      )
      const mockFormsLoadingPromise = new Promise(function(resolve, reject) {})

      const mockGetFormsAPI = jest.fn()
      mockGetFormsAPI.mockReturnValue(mockFormsLoadingPromise)
      formsAPI.getFormsAPI = mockGetFormsAPI

      waitFor(() => {
         expect(getByTestId('test-loader')).toBeInTheDocument()
      })
   })

   it('should test get forms success state', async () => {
      const { getAllByRole } = render(
         <Router history={history}>
            <DashboardRoute authStore={authStore} formStore={formStore} />
         </Router>
      )
      const mockFormsSuccessPromise = new Promise(function(resolve, reject) {
         resolve(formsData)
      })

      const mockGetFormsAPI = jest.fn()
      mockGetFormsAPI.mockReturnValue(mockFormsSuccessPromise)
      formsAPI.getFormsAPI = mockGetFormsAPI

      waitFor(() => {
         expect(getAllByRole('button', 'No responses').length).toBe(
            formsData.forms.length
         )
      })
   })
   it('should test logout button', () => {
      const route = paths.dashboard
      history.push(route)
      const { getByTestId } = render(
         <Provider authStore={authStore} formStore={formStore}>
            <Router history={history}>
               <Route path={paths.dashboard}>
                  <DashboardRoute history={history} />
               </Route>
               <Route path={LOGIN_PATH}>
                  <LoginDisplay />
               </Route>
            </Router>
         </Provider>
      )

      fireEvent.click(getByTestId('logout-btn'))

      waitFor(() => {
         expect(getByTestId('logout-btn')).not.toBeInTheDocument()
         expect(getByTestId('login-display')).toHaveTextContent(LOGIN_PATH)
      })
   })
})
