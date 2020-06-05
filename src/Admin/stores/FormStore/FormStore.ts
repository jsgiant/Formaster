import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { notify, showSuccessMessage } from '../../../Common/utils/ToastUtils'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'
import FormsAPI from '../../services/FormsService/FormsFixture'
import FormModel from '../models/FormModel'

class FormStore {
   @observable formList
   @observable currentForm
   @observable getFormsDataAPIStatus: any
   @observable getFormsDataAPIError: any
   @observable postFormsAPIStatus: any
   @observable postFormsAPIResponse: any
   @observable deleteFormsAPIStatus: any
   @observable deleteFormsAPIResponse: any
   @observable updateFormsAPIError: any
   @observable getQuestionsAPIStatus: any
   @observable getQuestionsAPIError: any
   @observable offset: number = 0
   @observable initialLimit: number = 9

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
         return new FormModel(form, this.formService)
      })
   }

   @action.bound
   setPostFormsAPIStatus(apiStatus) {
      this.postFormsAPIStatus = apiStatus
   }

   @action.bound
   setPostFormsAPIResponse(apiResponse) {
      this.postFormsAPIResponse = apiResponse
      this.formList.push(new FormModel(apiResponse, this.formService))
   }

   @action.bound
   setDeleteFormsAPIStatus(apiStatus) {
      this.deleteFormsAPIStatus = apiStatus
   }

   @action.bound
   setUpdateFormError(apiError) {
      notify(getUserDisplayableErrorMessage(apiError))
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
      this.currentForm = new FormModel(apiResponse, this.formService)
   }

   @action.bound
   getUserForms(): any {
      const getFormsPromise = this.formService.getFormsAPI(
         this.initialLimit,
         this.offset
      )
      this.onBindPromiseWithOnSuccess(
         getFormsPromise,
         this.setGetFormDataAPIStatus,
         this.setGetFormDataAPIResponse,
         this.setGetFormDataAPIError
      )
   }

   @action.bound
   getFormQuestions(formId: number) {
      const getQuestionsPromise = this.formService.getQuestionsAPI(
         formId,
         this.initialLimit,
         this.offset
      )
      this.onBindPromiseWithOnSuccess(
         getQuestionsPromise,
         this.setGetQuestionsAPIStatus,
         this.setGetQuestionsAPIResponse,
         this.setGetQuestionsAPIError
      )
   }

   @action.bound
   onCreateForm(formName: string): any {
      const postFormPromise = this.formService.postFormsAPI({
         form_name: formName
      })
      this.onBindPromiseWithOnSuccess(
         postFormPromise,
         this.setPostFormsAPIStatus,
         this.setPostFormsAPIResponse,
         this.setUpdateFormError
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
      const deleteFormsResponse = this.formService.deleteFormsAPI(form.id)
      return bindPromiseWithOnSuccess(deleteFormsResponse)
         .to(this.setDeleteFormsAPIStatus, response => {
            showSuccessMessage(`${form.name} successfully deleted!`)
            this.formList.remove(form)
         })
         .catch(error => this.setUpdateFormError(error))
   }
}

export { FormStore }
