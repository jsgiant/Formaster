import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import {
   setAccessToken,
   clearUserSession
} from '../../../common/utils/StorageUtils'

class AuthStore {
   @observable getLoginAPIStatus
   @observable getLoginAPIError
   @observable isAdmin

   authAPIService

   constructor(authAPIService) {
      this.init()
      this.authAPIService = authAPIService
   }

   @action.bound
   init() {
      this.getLoginAPIStatus = API_INITIAL
      this.getLoginAPIError = null
      this.isAdmin = false
   }

   @action.bound
   setGetLoginAPIStatus(apiStatus) {
      this.getLoginAPIStatus = apiStatus
   }

   @action.bound
   setGetLoginAPIError(apiError) {
      this.getLoginAPIError = apiError
   }

   @action.bound
   setGetLoginAPIResponse(apiResponse) {
      // this.isAdmin = apiResponse.is_admin
      setAccessToken(apiResponse[0].access_token)
   }

   @action.bound
   userLogin(request, onSuccess, onFailure) {
      const loginPromise = this.authAPIService.getLoginAPI(request)
      return bindPromiseWithOnSuccess(loginPromise)
         .to(this.setGetLoginAPIStatus, response => {
            this.setGetLoginAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setGetLoginAPIError(error)
            onFailure(error)
         })
   }

   onSignOut = () => {
      this.init()
      clearUserSession()
   }
}
export { AuthStore }
