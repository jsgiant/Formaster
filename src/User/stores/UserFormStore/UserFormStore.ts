import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class UserFormStore {
   @observable userFormsList: Array<any> = []
   @observable getUserFormsAPIStatus: any
   @observable getUserFormsAPIError: any
   @observable postUserResponsesStatus: any
   @observable postUserResponsesError: any
   userFormsAPI: any

   constructor(userFormsAPI: any) {
      this.userFormsAPI = userFormsAPI
      this.init()
   }

   @action.bound
   init() {
      this.getUserFormsAPIError = null
      this.getUserFormsAPIStatus = API_INITIAL
      this.postUserResponsesError = null
      this.postUserResponsesStatus = API_INITIAL
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
   getUserForms() {
      const getUserFormsPromise = this.userFormsAPI.getUserFormsAPI()
      return bindPromiseWithOnSuccess(getUserFormsPromise)
         .to(this.setGetUserFormAPIStatus, this.setGetUserFormsResponse)
         .catch(e => this.setGetUserFormAPIError(e))
   }
}

export { UserFormStore }
