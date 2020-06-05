import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import strings from './../../i18n/strings.json'
import { paths } from '../../../Common/constants/Paths'

class AuthService {
   api

   constructor() {
      this.api = create({
         baseURL: `${paths.baseURL}`
      })
   }

   getLoginAPI(request) {
      return networkCallWithApisauce(
         this.api,
         strings.login.loginEndpoint,
         request,
         apiMethods.post
      )
   }
}

export { AuthService }
