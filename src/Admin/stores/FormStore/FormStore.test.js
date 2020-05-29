import formsData from './../../fixtures/forms-data.json'
import GetFormsAPI from '../../services/FormsService/GetFormsAPI'
import FormStore from '.'
import {
   API_INITIAL,
   API_FETCHING,
   API_FAILED,
   API_SUCCESS
} from '@ib/api-constants'

describe('formstore tests', () => {
   let getFormsAPI
   let formStore

   beforeEach(() => {
      getFormsAPI = new GetFormsAPI()
      formStore = new FormStore(getFormsAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test initialising the store', () => {
      expect(formStore.getFormsDataAPIStatus).toBe(API_INITIAL)
      expect(formStore.getFormsDataAPIError).toBe(null)
   })

   it('should test getFormsAPI fetching state', () => {
      const mockFetchingPromise = new Promise(resolve => {})
      const mockGetFormsAPI = jest.fn()
      mockGetFormsAPI.mockReturnValue(mockFetchingPromise)
      getFormsAPI.getFormsAPI = mockGetFormsAPI

      formStore.getUserForms()
      expect(formStore.getFormsDataAPIStatus).toBe(API_FETCHING)
   })

   it('should test getFormsAPI failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      })

      const mockGetFormsAPI = jest.fn()
      mockGetFormsAPI.mockReturnValue(mockFailurePromise)
      getFormsAPI.getFormsAPI = mockGetFormsAPI

      await formStore.getUserForms()
      expect(formStore.getFormsDataAPIStatus).toBe(API_FAILED)
      expect(formStore.getFormsDataAPIError).toBe('error')
   })

   it('should test getFormsAPI success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(formsData)
      })

      const mockGetFormsAPI = jest.fn()
      mockGetFormsAPI.mockReturnValue(mockSuccessPromise)
      getFormsAPI.getFormsAPI = mockGetFormsAPI

      await formStore.getUserForms()
      expect(formStore.getFormsDataAPIStatus).toBe(API_SUCCESS)
      expect(formsData.forms.length).toBe(formStore.formList.length)
   })
})
