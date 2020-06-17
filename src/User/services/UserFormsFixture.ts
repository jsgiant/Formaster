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

   postResponsesAPI(formId, responses) {
      return new Promise(resolve => resolve('success'))
   }
}

export default UserFormsAPI
