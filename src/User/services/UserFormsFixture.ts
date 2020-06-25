import userFormsData from './../fixtures/user-forms.json'
import { UserFormService } from '.'
import { resolveWithTimeout } from '../../Common/utils/TestUtils'

class UserFormsAPI implements UserFormService {
   getUserFormsAPI() {
      return resolveWithTimeout(userFormsData)
   }

   getQuestionsAPI(formId) {
      return resolveWithTimeout(userFormsData.form_questions[--formId])
   }

   postResponsesAPI() {
      return resolveWithTimeout('success')
   }
}

export default UserFormsAPI
