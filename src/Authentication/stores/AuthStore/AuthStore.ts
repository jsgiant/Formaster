import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import {
   setAccessToken,
   clearUserSession,
   setIsAdmin
} from '../../../Common/utils/StorageUtils'
import AuthService from '../../services/AuthService'
import { apiResponse, requestObject } from '../../services/AuthService/AuthAPI'

class AuthStore {
   @observable getLoginAPIStatus: number = API_INITIAL
   @observable getLoginAPIError: string | null = null
   @observable isAdmin: boolean = false

   authAPIService: AuthService

   constructor(authAPIService: AuthService) {
      this.init()
      this.authAPIService = authAPIService
   }

   @action.bound
   init(): void {
      this.getLoginAPIStatus = API_INITIAL
      this.getLoginAPIError = null
      this.isAdmin = false
   }

   @action.bound
   setGetLoginAPIStatus(apiStatus: number): void {
      this.getLoginAPIStatus = apiStatus
   }

   @action.bound
   setGetLoginAPIError(apiError: string): void {
      this.getLoginAPIError = apiError
   }

   @action.bound
   setGetLoginAPIResponse(apiResponse: apiResponse): void {
      this.isAdmin = apiResponse.is_admin
      setIsAdmin(apiResponse.is_admin)
      setAccessToken(apiResponse.access_token)
   }

   @action.bound
   userLogin(
      request: requestObject,
      onSuccess: () => null,
      onFailure: (error: string) => void
   ): Promise<any> {
      const loginPromise: Promise<any> = this.authAPIService.getLoginAPI(
         request
      )
      return bindPromiseWithOnSuccess(loginPromise)
         .to(this.setGetLoginAPIStatus, (response: any) => {
            this.setGetLoginAPIResponse(response)
            onSuccess()
         })
         .catch((error: string) => {
            this.setGetLoginAPIError(error)
            onFailure(error)
         })
   }

   onSignOut = (): void => {
      this.init()
      clearUserSession()
   }
}
export { AuthStore }
