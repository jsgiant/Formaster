import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import FormsAPI from '../../services/FormsService/FormsFixture'
import FormModel from '../models/FormModel'

class FormStore {
   @observable formList
   @observable currentForm
   @observable getFormsDataAPIStatus: any
   @observable getFormsDataAPIError: any
   @observable postFormsAPIStatus: any
   @observable postFormsAPIResponse: any
   @observable putFormsAPIStatus: any
   @observable putFormsAPIResponse: any
   @observable deleteFormsAPIStatus: any
   @observable deleteFormsAPIResponse: any
   @observable updateFormsAPIError: any
   @observable getQuestionsAPIStatus: any
   @observable getQuestionsAPIError: any

   formService: any

   constructor(formService: FormsAPI) {
      this.formService = formService
      this.init()
   }

   @action.bound
   init() {
      this.getFormsDataAPIStatus = API_INITIAL
      this.getFormsDataAPIError = null
      this.postFormsAPIStatus = API_INITIAL
      this.postFormsAPIResponse = null
      this.putFormsAPIStatus = API_INITIAL
      this.putFormsAPIResponse = null
      this.deleteFormsAPIStatus = API_INITIAL
      this.getFormsDataAPIStatus = API_INITIAL
      this.getFormsDataAPIError = null
      this.deleteFormsAPIResponse = null
      this.updateFormsAPIError = null
      this.formList = []
   }

   @action.bound
   setGetFormDataAPIStatus(apiStatus) {
      this.getFormsDataAPIStatus = apiStatus
   }

   @action.bound
   setGetFormDataAPIError(apiError) {
      this.getFormsDataAPIError = apiError
   }

   @action.bound
   setGetFormDataAPIResponse(formsData) {
      this.formList = formsData.forms.map(form => {
         return new FormModel(form)
      })
   }

   @action.bound
   setPostFormsAPIStatus(apiStatus) {
      this.postFormsAPIStatus = apiStatus
   }

   @action.bound
   setPostFormsAPIResponse(apiResponse) {
      this.postFormsAPIResponse = apiResponse
      //this.getUserForms()
      //for testing
      const getFormsPromise = this.formService.getUpdatedFormAPI()
      this.onBindPromiseWithOnSuccess(
         getFormsPromise,
         this.setGetFormDataAPIStatus,
         this.setGetFormDataAPIResponse,
         this.setGetFormDataAPIError
      )
   }

   @action.bound
   setPutFormsAPIStatus(apiStatus) {
      this.putFormsAPIStatus = apiStatus
   }

   @action.bound
   setPutFormsAPIResponse(apiResponse) {
      this.putFormsAPIResponse = apiResponse
   }

   @action.bound
   setDeleteFormsAPIStatus(apiStatus) {
      this.deleteFormsAPIStatus = apiStatus
   }

   @action.bound
   setDeleteFormsAPIResponse(apiResponse) {
      this.deleteFormsAPIResponse = apiResponse
      //this.getUserForms()
      // for testing
      const getFormsPromise = this.formService.getUpdatedFormsAPI()
      this.onBindPromiseWithOnSuccess(
         getFormsPromise,
         this.setGetFormDataAPIStatus,
         this.setGetFormDataAPIResponse,
         this.setGetFormDataAPIError
      )
   }

   @action.bound
   setupdateFormsAPIError(apiError) {
      this.updateFormsAPIError = apiError
   }

   @action.bound
   setGetQuestionsAPIStatus(apiStatus) {
      this.getQuestionsAPIStatus = apiStatus
   }

   @action.bound
   setGetQuestionsAPIError(apiError) {
      this.getQuestionsAPIError = apiError
   }

   @action.bound
   setGetQuestionsAPIResponse(apiResponse) {
      this.currentForm = new FormModel(apiResponse)
   }

   @action.bound
   getUserForms(): any {
      const getFormsPromise = this.formService.getFormsAPI()
      this.onBindPromiseWithOnSuccess(
         getFormsPromise,
         this.setGetFormDataAPIStatus,
         this.setGetFormDataAPIResponse,
         this.setGetFormDataAPIError
      )
   }

   @action.bound
   getFormQuestions(formId: number) {
      const getQuestionsPromise = this.formService.getQuestionsAPI(formId)
      this.onBindPromiseWithOnSuccess(
         getQuestionsPromise,
         this.setGetQuestionsAPIStatus,
         this.setGetQuestionsAPIResponse,
         this.setGetQuestionsAPIError
      )
   }

   @action.bound
   onCreateForm(formName: string): any {
      const postFormPromise = this.formService.postFormsAPI(formName)
      this.onBindPromiseWithOnSuccess(
         postFormPromise,
         this.setPostFormsAPIStatus,
         this.setPostFormsAPIResponse,
         this.setupdateFormsAPIError
      )
   }

   @action.bound
   onBindPromiseWithOnSuccess(promise, setStatus, onSuccess, onFailure) {
      return bindPromiseWithOnSuccess(promise)
         .to(setStatus, onSuccess)
         .catch(error => onFailure(error))
   }

   @action.bound
   onDeleteForm(form) {
      // const deleteFormsResponse = this.formService.deleteFormsAPI(form.id)
      // return bindPromiseWithOnSuccess(deleteFormsResponse)
      //    .to(this.setDeleteFormsAPIStatus, this.setDeleteFormsAPIResponse)
      //    .catch(error => this.setupdateFormsAPIError(error))
      this.formList.remove(form)
   }
}

export { FormStore }
