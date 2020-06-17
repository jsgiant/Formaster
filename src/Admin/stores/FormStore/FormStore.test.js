import {
   API_INITIAL,
   API_FETCHING,
   API_FAILED,
   API_SUCCESS
} from '@ib/api-constants'
import { waitFor } from '@testing-library/react'

import formsData from './../../fixtures/forms-data.json'
import updateFormData from './../../fixtures/updated-forms-data.json'
import FormsAPI from '../../services/FormsService/FormsFixture'

import FormStore from '.'

describe('formstore tests', () => {
   let formsAPI
   let formStore

   beforeEach(() => {
      formsAPI = new FormsAPI()
      formStore = new FormStore(formsAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test initialising the store', () => {
      expect(formStore.getFormsDataAPIStatus).toBe(API_INITIAL)
      expect(formStore.postFormsAPIStatus).toBe(API_INITIAL)
      expect(formStore.deleteFormsAPIStatus).toBe(API_INITIAL)
      expect(formStore.getQuestionsAPIStatus).toBe(API_INITIAL)
      expect(formStore.getQuestionsAPIError).toBe(null)
      expect(formStore.updateFormsAPIError).toBe(null)
      expect(formStore.getFormsDataAPIError).toBe(null)
   })

   it('should test getFormsAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})
      const mockGetFormsAPI = jest.fn()
      mockGetFormsAPI.mockReturnValue(mockFetchingPromise)
      formsAPI.getFormsAPI = mockGetFormsAPI

      formStore.getUserForms()
      expect(formStore.getFormsDataAPIStatus).toBe(API_FETCHING)
   })

   it('should test getFormsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error('error'))
      })

      const mockGetFormsAPI = jest.fn()
      mockGetFormsAPI.mockReturnValue(mockFailurePromise)
      formsAPI.getFormsAPI = mockGetFormsAPI

      await formStore.getUserForms()
      waitFor(() => {
         expect(formStore.getFormsDataAPIStatus).toBe(API_FAILED)
         expect(formStore.getFormsDataAPIError).toBe('error')
      })
   })

   it('should test getFormsAPI success state', async () => {
      const mockSuccessPromise = new Promise((resolve, _) => {
         resolve(formsData)
      })

      const mockGetFormsAPI = jest.fn()
      mockGetFormsAPI.mockReturnValue(mockSuccessPromise)
      formsAPI.getFormsAPI = mockGetFormsAPI
      await formStore.getUserForms()
      waitFor(() => {
         expect(formStore.getFormsDataAPIStatus).toBe(API_SUCCESS)
         expect(formsData.forms.length).toBe(formStore.formList.length)
      })
   })

   it('should test postFormsAPI fetching state', () => {
      const formName = 'New form'
      const mockFetchingPromise = new Promise(_ => {})

      const mockPostFormsAPI = jest.fn()
      mockPostFormsAPI.mockReturnValue(mockFetchingPromise)
      formsAPI.postFormsAPI = mockPostFormsAPI

      formStore.onCreateForm(formName)
      expect(formStore.postFormsAPIStatus).toBe(API_FETCHING)
   })

   it('should test postFormsAPI success state', async () => {
      const formName = 'New form'
      const mockSuccessPromise = new Promise((resolve, _) => {
         resolve(updateFormData)
      })

      const mockPostFormsAPI = jest.fn()
      mockPostFormsAPI.mockReturnValue(mockSuccessPromise)
      formsAPI.postFormsAPI = mockPostFormsAPI
      await formStore.onCreateForm(formName)
      waitFor(() => {
         expect(formStore.postFormsAPIStatus).toBe(API_SUCCESS)
         expect(formsData.forms.length + 1).toBe(formStore.formList.length)
      })
   })

   it('should test postFormsAPI failure state', async () => {
      const formName = 'New form'
      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error('error'))
      }).catch()

      const mockPostFormsAPI = jest.fn()
      mockPostFormsAPI.mockReturnValue(mockFailurePromise)
      formsAPI.postFormsAPI = mockPostFormsAPI

      await formStore.onCreateForm(formName)
      waitFor(() => {
         expect(formStore.postFormsAPIStatus).toBe(API_FAILED)
         expect(formStore.updateFormsAPIError).toBe('error')
      })
   })

   it('should test deleteFormsAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve(formsData.delete_form_data)
      })

      const mockDeleteFormAPI = jest.fn()
      mockDeleteFormAPI.mockReturnValue(mockSuccessPromise)
      formsAPI.deleteFormsAPI = mockDeleteFormAPI
      await formStore.onDeleteForm(formsData.forms[0])

      waitFor(() => {
         expect(formStore.deleteFormsAPIStatus).toBe(API_SUCCESS)
         expect(formStore.deleteFormsAPIResponse).toBe(
            formsData.delete_form_data
         )
      })
   })

   it('should test deleteFormsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error('error'))
      }).catch()

      const mockDeleteFormsAPI = jest.fn()
      mockDeleteFormsAPI.mockReturnValue(mockFailurePromise)
      formsAPI.deleteFormsAPI = mockDeleteFormsAPI

      await formStore.onDeleteForm(formsData.forms[0])
      waitFor(() => {
         expect(formStore.deleteFormsAPIStatus).toBe(API_FAILED)
         expect(formStore.updateFormsAPIError).toBe('error')
      })
   })

   it('should test getQuestionsAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve(formsData.forms[0])
      })

      const mockQuestionsAPI = jest.fn()
      mockQuestionsAPI.mockReturnValue(mockSuccessPromise)
      formsAPI.getQuestionsAPI = mockQuestionsAPI
      await formStore.getFormQuestions(0)

      waitFor(() => {
         expect(formStore.getQuestionsAPIStatus).toBe(API_SUCCESS)
         expect(formStore.getQuestionsAPIResponse).toBe(formsData.forms[0])
      })
   })

   it('should test getQuestionsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error('error'))
      })

      const mockQuestionsAPI = jest.fn()
      mockQuestionsAPI.mockReturnValue(mockFailurePromise)
      formsAPI.getQuestionsAPI = mockQuestionsAPI
      await formStore.getFormQuestions(0)

      waitFor(() => {
         expect(formStore.getQuestionsAPIStatus).toBe(API_FAILED)
         expect(formStore.getQuestionsAPIError).toBe('error')
      })
   })
})
