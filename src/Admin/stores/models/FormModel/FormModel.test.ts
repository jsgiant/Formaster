import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import { waitFor } from '@testing-library/react'
import formsData from '../../../fixtures/forms-data.json'
import FormsAPI from '../../../services/FormsService/FormsFixture'
import QuestionStore from '../../QuestionStore'
import FormModel from '.'

describe('Form model tests', () => {
   let formsAPI: FormsAPI
   let questionStore: QuestionStore
   let formModel: FormModel
   const formDetails = formsData.form_questions[0]
   beforeEach(() => {
      formsAPI = new FormsAPI()
      questionStore = new QuestionStore(formDetails.questions)
      formModel = new FormModel(formDetails, formsAPI, questionStore)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test initialising the model', () => {
      expect(formModel.postQuestionsAPIStatus).toBe(API_INITIAL)
      expect(formModel.putFormsAPIStatus).toBe(API_INITIAL)
      expect(formModel.postQuestionsAPIError).toBe(null)
      expect(formModel.putFormsAPIError).toBe(null)
   })

   it('should test putFormsAPI processing state', () => {
      const mockProcessingPromise = new Promise(_ => {})
      const mockPutFormsAPI = jest.fn()

      mockPutFormsAPI.mockReturnValue(mockProcessingPromise)
      formsAPI.putFormsAPI = mockPutFormsAPI
      formModel.onRenameForm('form')

      expect(formModel.putFormsAPIStatus).toBe(API_FETCHING)
   })

   it('should test putFormsAPI SuccessState', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve('form')
      })
      const mockPutFormsAPI = jest.fn()

      mockPutFormsAPI.mockReturnValue(mockSuccessPromise)
      formsAPI.putFormsAPI = mockPutFormsAPI
      await formModel.onRenameForm('form')

      waitFor(() => {
         expect(formModel.putFormsAPIStatus).toBe(API_SUCCESS)
         expect(formModel.showSuccessMessage).toBeCalled()
      })
   })

   it('should test putFormsAPI failure state', async () => {
      const errorMessage = 'Error while updating form'
      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error(errorMessage))
      })
      const mockPutFormsAPI = jest.fn()

      mockPutFormsAPI.mockReturnValue(mockFailurePromise)
      formsAPI.putFormsAPI = mockPutFormsAPI
      await formModel.onRenameForm('form')
      waitFor(() => {
         expect(formModel.putFormsAPIStatus).toBe(API_FAILED)
         expect(formModel.putFormsAPIError).toBe(errorMessage)
      })
   })

   it('should test postQuestionsAPI processing state', () => {
      const mockProcessingPromise = new Promise(_ => {})
      const mockPostQuestionsAPI = jest.fn()

      mockPostQuestionsAPI.mockReturnValue(mockProcessingPromise)
      formsAPI.postQuestionsAPI = mockPostQuestionsAPI

      formModel.onPublishForm(1)
      expect(formModel.postQuestionsAPIStatus).toBe(API_FETCHING)
   })

   it('should test postQuestions Success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve('success')
      })
      const mockPostQuestionsAPI = jest.fn()

      mockPostQuestionsAPI.mockReturnValue(mockSuccessPromise)
      formsAPI.postQuestionsAPI = mockPostQuestionsAPI
      await formModel.onPublishForm(1)

      waitFor(() => {
         expect(formModel.postQuestionsAPIStatus).toBe(API_SUCCESS)
         expect(formModel.showSuccessMessage).toBeCalled()
      })
   })

   it('should test postQuestions failure state', async () => {
      const errorMessage = 'Error while posting error'
      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error(errorMessage))
      })
      const mockPostQuestionsAPI = jest.fn()

      mockPostQuestionsAPI.mockReturnValue(mockFailurePromise)
      formsAPI.postQuestionsAPI = mockPostQuestionsAPI
      await formModel.onPublishForm(1)

      waitFor(() => {
         expect(formModel.postQuestionsAPIStatus).toBe(API_FAILED)
         expect(formModel.postQuestionsAPIError).toBe(errorMessage)
      })
   })
})
