import { waitFor } from '@testing-library/react'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import UserFormsAPI from '../../services/UserFormsFixture'
import UserFormStore from '.'

describe('User form store tests', () => {
   let userFormsAPI
   let userFormStore

   beforeEach(() => {
      userFormsAPI = new UserFormsAPI()
      userFormStore = new UserFormStore(userFormsAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test initialisation of store', () => {
      expect(userFormStore.getUserFormsAPIStatus).toBe(API_INITIAL)
      expect(userFormStore.getQuestionsAPIStatus).toBe(API_INITIAL)
      expect(userFormStore.getUserFormsAPIError).toBe(null)
      expect(userFormStore.getQuestionsAPIError).toBe(null)
   })

   it('should test getFormsAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockGetUserFormsAPI = jest.fn()
      mockGetUserFormsAPI.mockReturnValue(mockFetchingPromise)
      userFormsAPI.getUserFormsAPI = mockGetUserFormsAPI

      userFormStore.getUserForms()
      expect(userFormStore.getUserFormsAPIStatus).toBe(API_FETCHING)
   })

   it('should test getFormsAPI success state', async () => {
      await userFormStore.getUserForms()
      waitFor(() => {
         expect(userFormStore.getUserFormsAPIStatus).toBe(API_SUCCESS)
      })
   })

   it('should test getFormsAPI failure state', async () => {
      const errorMessage = 'Error while getting forms'
      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error(errorMessage))
      })

      const mockGetUserFormsAPI = jest.fn()
      mockGetUserFormsAPI.mockReturnValue(mockFailurePromise)
      userFormsAPI.getUserFormsAPI = mockGetUserFormsAPI
      await userFormStore.getUserForms()
      waitFor(() => {
         expect(userFormStore.getUserFormsAPIStatus).toBe(API_FAILED)
         expect(userFormStore.getUserFormsAPIError).toBe(errorMessage)
      })
   })

   it('should test getQuestionsAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockGetQuestionsAPI = jest.fn()
      mockGetQuestionsAPI.mockReturnValue(mockFetchingPromise)
      userFormsAPI.getQuestionsAPI = mockGetQuestionsAPI

      userFormStore.getSelectedFormQuestions(2)
      expect(userFormStore.getQuestionsAPIStatus).toBe(API_FETCHING)
   })

   it('should test getQuestionsAPI success state', async () => {
      await userFormStore.getSelectedFormQuestions(2)
      waitFor(() => {
         expect(userFormStore.getQuestionsAPIStatus).toBe(API_SUCCESS)
      })
   })

   it('should test getQuestionsAPI failure state', async () => {
      const errorMessage = 'Error while getting form questions'
      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error(errorMessage))
      })

      const mockGetQuestionsAPI = jest.fn()
      mockGetQuestionsAPI.mockReturnValue(mockFailurePromise)
      userFormsAPI.getQuestionsAPI = mockGetQuestionsAPI
      await userFormStore.getSelectedFormQuestions(2)
      waitFor(() => {
         expect(userFormStore.getQuestionsAPIStatus).toBe(API_FAILED)
         expect(userFormStore.getQuestionsAPIError).toBe(errorMessage)
      })
   })
})
