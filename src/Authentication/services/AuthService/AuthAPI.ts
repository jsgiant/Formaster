import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import strings from './../../i18n/strings.json'

class AuthService {
   api

   constructor() {
      this.api = create({
         baseURL: strings.login.baseURL
      })
   }

   getLoginAPI(request) {
      return networkCallWithApisauce(
         this.api,
         strings.login.loginEndpoint,
         { request },
         apiMethods.get
      )
   }
}

export { AuthService }
