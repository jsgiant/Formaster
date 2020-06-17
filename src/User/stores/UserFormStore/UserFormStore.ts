import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import FormModel from '../models/FormModel/FormModel'

class UserFormStore {
   @observable userFormsList: Array<any> = []
   @observable selectedForm: any
   @observable getUserFormsAPIStatus: any
   @observable getUserFormsAPIError: any
   @observable getQuestionsAPIStatus: any
   @observable getQuestionsAPIError: any

   userFormsAPI: any

   constructor(userFormsAPI: any) {
      this.userFormsAPI = userFormsAPI
      this.init()
   }

   @action.bound
   init() {
      this.getUserFormsAPIError = null
      this.getUserFormsAPIStatus = API_INITIAL
      this.getQuestionsAPIError = null
      this.getQuestionsAPIStatus = API_INITIAL
   }

   @action.bound
   setGetUserFormAPIStatus(apiStatus) {
      this.getUserFormsAPIStatus = apiStatus
   }

   @action.bound
   setGetUserFormAPIError(apiError) {
      this.getUserFormsAPIError = apiError
   }

   @action.bound
   setGetUserFormsResponse(apiResponse) {
      this.userFormsList = apiResponse.forms
   }

   @action.bound
   setGetQuesionsAPIStatus(apiStatus: number) {
      this.getQuestionsAPIStatus = apiStatus
   }

   @action.bound
   setGetQuestionsAPIError(apiError) {
      this.getQuestionsAPIError = apiError
   }

   @action.bound
   setGetQuestionsAPIResponse(apiResponse) {
      this.selectedForm = new FormModel(apiResponse, this.userFormsAPI)
   }

   @action.bound
   getUserForms() {
      const getUserFormsPromise = this.userFormsAPI.getUserFormsAPI()
      return bindPromiseWithOnSuccess(getUserFormsPromise)
         .to(this.setGetUserFormAPIStatus, this.setGetUserFormsResponse)
         .catch(e => this.setGetUserFormAPIError(e))
   }

   @action.bound
   getSelectedFormQuestions(formId) {
      const getQuestionsPromise = this.userFormsAPI.getQuestionsAPI(formId)
      return bindPromiseWithOnSuccess(getQuestionsPromise)
         .to(this.setGetQuesionsAPIStatus, this.setGetQuestionsAPIResponse)
         .catch(e => this.setGetQuestionsAPIError(e))
   }
}

export { UserFormStore }
