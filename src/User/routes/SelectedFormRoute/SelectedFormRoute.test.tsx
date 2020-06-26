import React from 'react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'
import { API_SUCCESS } from '@ib/api-constants'

import userFormsData from '../../fixtures/user-forms.json'
import UserFormsAPI from '../../services/UserFormsFixture'
import UserFormStore from '../../stores/UserFormStore'
import { render, waitFor, fireEvent } from '@testing-library/react'
import SelectedFormRoute from './SelectedFormRoute'

describe('User selected form tests', () => {
   let userFormsAPI
   let userFormStore
   const history = createMemoryHistory()

   beforeEach(() => {
      userFormsAPI = new UserFormsAPI()
      userFormStore = new UserFormStore(userFormsAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test loading state of selected form', () => {
      const route = `/form/${1}/response/`
      history.push(route)
      const { getByTestId, debug } = render(
         <Provider userFormStore={userFormStore}>
            <Router history={history}>
               <Route path={`/form/${1}/response/`}>
                  <SelectedFormRoute />
               </Route>
            </Router>
         </Provider>
      )

      const mockLoadingPromise = new Promise(_ => {})

      const mockGetQuestionsAPI = jest.fn()
      mockGetQuestionsAPI.mockReturnValue(mockLoadingPromise)
      userFormsAPI.getQuestionsAPI = mockGetQuestionsAPI

      expect(getByTestId('test-loader')).toBeInTheDocument()
   })

   it('should test selected form success state', async () => {
      const route = `/form/${1}/response/`
      history.push(route)
      const { getAllByTestId, debug } = render(
         <Provider userFormStore={userFormStore}>
            <Router history={history}>
               <Route path={`/form/:form_id/response/`}>
                  <SelectedFormRoute />
               </Route>
            </Router>
         </Provider>
      )

      await userFormStore.getSelectedFormQuestions(1)
      waitFor(() => {
         expect(userFormStore.getQuestionsAPIStatus).toBe(API_SUCCESS)
      })
   })

   it('should test form submission', async () => {
      const route = `/form/${1}/response/`
      history.push(route)
      const { getByRole, debug } = render(
         <Provider userFormStore={userFormStore}>
            <Router history={history}>
               <Route path={`/form/:form_id/response/`}>
                  <SelectedFormRoute />
               </Route>
            </Router>
         </Provider>
      )

      const mockSuccessPromise = new Promise(resolve => {
         resolve(userFormsData.test_questions[0])
      })

      const mockGetQuestionsAPI = jest.fn()
      mockGetQuestionsAPI.mockReturnValue(mockSuccessPromise)
      userFormsAPI.getQuestionsAPI = mockGetQuestionsAPI

      await userFormStore.getSelectedFormQuestions(1)
      waitFor(() => {
         const submitBtn = getByRole('button', { name: 'Submit' })
         expect(submitBtn).toBeInTheDocument()
         fireEvent.click(submitBtn)
         expect(submitBtn).not.toBeInTheDocument()
      })
   })
})
