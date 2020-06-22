import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import strings from './../../i18n/strings.json'
import { paths } from '../../../Common/constants/Paths'

export type requestObject = {
   userName: string
   password: string
}
export type apiResponse = {
   access_token: string
   is_admin: boolean
}

class AuthService {
   api: any

   constructor() {
      this.api = create({
         baseURL: `${paths.baseURL}`
      })
   }

   //Fix promise types

   getLoginAPI(request: requestObject): Promise<any> {
      return networkCallWithApisauce(
         this.api,
         strings.login.loginEndpoint,
         request,
         apiMethods.post
      )
   }
}

export { AuthService }
