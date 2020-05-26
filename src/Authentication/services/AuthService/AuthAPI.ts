import { create } from 'apisauce'
import strings from './../../i18n/strings.json'
import { networkCallWithApisauce } from '../../../utils/APIUtils'
import { apiMethods } from '../../../constants/APIConstants'

class AuthService {
   api

   constructor() {
      this.api = create({
         baseURL: strings.baseURL
      })
   }

   getLoginAPI(request) {
      return networkCallWithApisauce(
         this.api,
         strings.loginEndpoint,
         { request },
         apiMethods.get
      )
   }
}

export { AuthService }
