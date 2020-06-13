import authData from './../../fixtures/login-api-response.json'

class AuthService {
   api
   getLoginAPI(request) {
      return new Promise((resolve, reject) => {
         setTimeout(() => resolve(authData.admin), 2000)
         // reject(new Error('Invalid credentials'))
      })
   }
}

export default AuthService
