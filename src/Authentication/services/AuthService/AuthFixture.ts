import authData from './../../fixtures/login-api-response.json'
import { requestObject } from './AuthAPI'

class AuthService {
   api: any
   getLoginAPI(request: requestObject): Promise<any> {
      return new Promise(resolve => {
         setTimeout(() => resolve(authData.customer))
      })
   }
}

export default AuthService
