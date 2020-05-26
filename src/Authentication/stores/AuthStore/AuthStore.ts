import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import strings from './../../i18n/strings.json'
import { setAccessToken, clearUserSession } from '../../../utils/StorageUtils'

class AuthStore {
   @observable getLoginAPIStatus
   @observable getLoginAPIError
   @observable isAdmin
   @observable username

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
      this.username = strings.username
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
      this.username = apiResponse.username
      this.isAdmin = apiResponse.is_admin
      setAccessToken(apiResponse.access_token)
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
            onFailure()
         })
   }

   onSignOut = () => {
      this.init()
      clearUserSession()
   }
}
export { AuthStore }
