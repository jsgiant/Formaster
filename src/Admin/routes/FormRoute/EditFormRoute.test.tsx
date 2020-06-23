import React from 'react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import AuthService from '../../../Authentication/services/AuthService/AuthFixture'
import AuthStore from '../../../Authentication/stores/AuthStore'
import { paths } from '../../../Common/constants/Paths'
import { LOGIN_PATH } from '../../../Authentication/constants/Paths'

import formsData from '../../fixtures/forms-data.json'
import FormsAPI from '../../services/FormsService/FormsFixture'
import FormStore from '../../stores/FormStore'
import EditFormRoute from './EditFormRoute'

const LoginDisplay = withRouter(() => (
   <div data-testid='login-display'>LoginForm</div>
))

const Dashboard = withRouter(() => <div data-testid='dashboard'>Dashboard</div>)

describe('Edit form route tests', () => {
   let authAPI: AuthService
   let authStore: AuthStore
   let formsAPI: FormsAPI
   let formStore: FormStore

   const history = createMemoryHistory()

   beforeEach(() => {
      authAPI = new AuthService()
      authStore = new AuthStore(authAPI)
      formsAPI = new FormsAPI()
      formStore = new FormStore(formsAPI)
      window.confirm = jest.fn(() => true)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test navigate back button', async () => {
      const route = `/form/${1}`
      history.push(route)
      const { getByTestId } = render(
         <Provider authStore={authStore} formStore={formStore}>
            <Router history={history}>
               <Route path={`/form/${1}`}>
                  <EditFormRoute history={history} />
               </Route>
               <Route path={paths.dashboard}>
                  <Dashboard />
               </Route>
            </Router>
         </Provider>
      )

      const mockSuccessPromise = new Promise(resolve => {
         resolve(formsData.form_questions[0])
      })
      const mockGetQuestionsAPI = jest.fn()
      mockGetQuestionsAPI.mockReturnValue(mockSuccessPromise)
      formsAPI.getQuestionsAPI = mockGetQuestionsAPI
      await formStore.getFormQuestions(1)
      waitFor(() => {
         fireEvent.click(getByTestId('test-back'))
         expect(getByTestId('dashboard')).toHaveTextContent('Dashboard')
      })
   })
   it('should test logout button', async () => {
      const route = `/form/${1}`
      history.push(route)
      const { getByTestId } = render(
         <Provider authStore={authStore} formStore={formStore}>
            <Router history={history}>
               <Route path={`/form/${1}`}>
                  <EditFormRoute history={history} />
               </Route>
               <Route path={LOGIN_PATH}>
                  <LoginDisplay />
               </Route>
            </Router>
         </Provider>
      )

      const mockSuccessPromise = new Promise(resolve => {
         resolve(formsData.form_questions[0])
      })
      const mockGetQuestionsAPI = jest.fn()
      mockGetQuestionsAPI.mockReturnValue(mockSuccessPromise)
      formsAPI.getQuestionsAPI = mockGetQuestionsAPI
      await formStore.getFormQuestions(1)
      waitFor(() => {
         fireEvent.click(getByTestId('logout-btn'))
         expect(getByTestId('login-display')).toHaveTextContent('LoginForm')
      })
   })
})
