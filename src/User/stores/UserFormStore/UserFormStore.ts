import { observable, action } from 'mobx'
import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import FormModel from '../models/FormModel/FormModel'
import { getFormattedErrorDescription } from '../../../Common/utils/APIUtils'
import { Form } from '../types'

class UserFormStore {
   @observable userFormsList!: Array<Form>
   @observable selectedForm!: FormModel
   @observable getUserFormsAPIStatus!: APIStatus
   @observable getUserFormsAPIError!: string | null
   @observable getQuestionsAPIStatus!: APIStatus
   @observable getQuestionsAPIError!: string | null

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
      this.getUserFormsAPIError = getFormattedErrorDescription(apiError)
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
      this.getQuestionsAPIError = getFormattedErrorDescription(apiError)
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
