import userFormsData from './../fixtures/user-forms.json'

class UserFormsAPI {
   api
   getUserFormsAPI() {
      return new Promise(resolve => {
         resolve(userFormsData)
      })
   }
}

export default UserFormsAPI
