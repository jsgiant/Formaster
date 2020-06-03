import userFormsData from './../fixtures/user-forms.json'

class UserFormsAPI {
   api
   getUserFormsAPI() {
      return new Promise(resolve => {
         resolve(userFormsData)
      })
   }

   getQuestionsAPI(formId) {
      return new Promise(resolve =>
         resolve(userFormsData.form_questions[--formId])
      )
   }
}

export default UserFormsAPI
