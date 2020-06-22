import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import { waitFor } from '@testing-library/react'
import userForms from '../../../fixtures/user-forms.json'
import UserFormsAPI from '../../../services/UserFormsFixture'
import FormModel from './FormModel'

describe('User form model tests', () => {
   let formsAPI
   let formModel
   const form = userForms.form_questions[0]

   beforeEach(() => {
      formsAPI = new UserFormsAPI()
      formModel = new FormModel(form, formsAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test initial state of form model', () => {
      expect(formModel.postResponsesAPIStatus).toBe(API_INITIAL)
      expect(formModel.postResponsesAPIError).toBe(null)
   })

   it('should test postResponseAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})
      const mockPostResponseAPI = jest.fn()
      mockPostResponseAPI.mockReturnValue(mockFetchingPromise)
      formsAPI.postResponsesAPI = mockPostResponseAPI

      formModel.postSubmittedResponses(1)
      expect(formModel.postResponsesAPIStatus).toBe(API_FETCHING)
   })

   it('should test postResponseAPI success state', async () => {
      await formModel.postSubmittedResponses(1)
      waitFor(() => {
         expect(formModel.postResponsesAPIStatus).toBe(API_SUCCESS)
      })
   })

   it('should test postResponseAPI failure state', async () => {
      const errorMessage = 'Error while submitting!'
      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error(errorMessage))
      })
      const mockPostResponseAPI = jest.fn()
      mockPostResponseAPI.mockReturnValue(mockFailurePromise)
      formsAPI.postResponsesAPI = mockPostResponseAPI

      await formModel.postSubmittedResponses(1)
      waitFor(() => {
         expect(formModel.postResponsesAPIStatus).toBe(API_FAILED)
         expect(formModel.postResponsesAPIError).toBe(errorMessage)
      })
   })

   it('should test postResponseAPI failure state with validation error', async () => {
      const errorMessage = 'Fill required fields!'
      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error(errorMessage))
      })
      const mockPostResponseAPI = jest.fn()
      mockPostResponseAPI.mockReturnValue(mockFailurePromise)
      formsAPI.postResponsesAPI = mockPostResponseAPI

      await formModel.postSubmittedResponses(1)
      waitFor(() => {
         expect(formModel.postResponsesAPIStatus).toBe(API_FAILED)
         expect(formModel.postResponsesAPIError).toBe(errorMessage)
      })
   })
})
