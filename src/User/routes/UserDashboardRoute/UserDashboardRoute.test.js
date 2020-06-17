import React from 'react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { createMemoryHistory } from 'history'

import { paths } from '../../../Common/constants/Paths'
import { LOGIN_PATH } from '../../../Authentication/constants/paths'
import AuthService from '../../../Authentication/services/AuthService'
import AuthStore from '../../../Authentication/stores/AuthStore'
import userFormsData from './../../fixtures/user-forms.json'
import UserFormsAPI from '../../services/UserFormsFixture'
import UserFormStore from '../../stores/UserFormStore'
import UserDashboardRoute from './UserDashboardRoute'

const LoginDisplay = withRouter(({ location }) => (
   <div data-testid='login-display'>LoginForm</div>
))

const SelectedForm = withRouter(({ location }) => (
   <div data-testid='selected-form'>Selected form</div>
))

describe('User dashboard route tests', () => {
   let authAPI
   let authStore
   let userFormsAPI
   let userFormStore
   const history = createMemoryHistory()

   beforeEach(() => {
      authAPI = new AuthService()
      authStore = new AuthStore(authAPI)
      userFormsAPI = new UserFormsAPI()
      userFormStore = new UserFormStore(userFormsAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test logout button', () => {
      const route = paths.userDashboard
      history.push(route)
      const { getByTestId } = render(
         <Provider authStore={authStore} userFormStore={userFormStore}>
            <Router history={history}>
               <Route path={paths.userDashboard}>
                  <UserDashboardRoute history={history} />
               </Route>
               <Route path={LOGIN_PATH}>
                  <LoginDisplay />
               </Route>
            </Router>
         </Provider>
      )

      fireEvent.click(getByTestId('logout-btn'))

      waitFor(() => {
         // expect(getByTestId('logout-btn')).not.toBeInTheDocument()
         expect(getByTestId('login-display')).toHaveTextContent('LoginForm')
      })
   })

   it('should test navigation to selected form', async () => {
      const route = paths.userDashboard
      history.push(route)
      const { getAllByTestId, getByTestId } = render(
         <Provider authStore={authStore} userFormStore={userFormStore}>
            <Router history={history}>
               <Route path={paths.userDashboard}>
                  <UserDashboardRoute history={history} />
               </Route>
               <Route path={`/form/${1}/response`}>
                  <SelectedForm />
               </Route>
            </Router>
         </Provider>
      )

      const mockSuccessPromise = new Promise(resolve => {
         resolve(userFormsData.form_questions[0])
      })

      const mockGetQuestionsAPI = jest.fn()
      mockGetQuestionsAPI.mockReturnValue(mockSuccessPromise)
      userFormsAPI.getQuestionsAPI = mockGetQuestionsAPI

      await userFormStore.getUserForms()
      waitFor(() => {
         fireEvent.click(getAllByTestId('test-card')[0])
         expect(getByTestId('selected-form')).toHaveTextContent('Selected form')
      })
   })
})
