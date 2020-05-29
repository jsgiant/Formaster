import authData from './../../fixtures/login-api-response.json'

class AuthService {
   api
   getLoginAPI(request) {
      return new Promise((resolve, reject) => {
         setTimeout(() => resolve(authData), 2000)
      })
   }
}

export default AuthService
