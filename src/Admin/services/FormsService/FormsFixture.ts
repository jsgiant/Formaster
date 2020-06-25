import formsData from '../../fixtures/forms-data.json'
import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import FormService from '.'

class FormsAPI implements FormService {
   getFormsAPI() {
      return resolveWithTimeout(formsData)
   }

   postFormsAPI(_formName) {
      return resolveWithTimeout(formsData.post_forms_resonse)
   }

   putFormsAPI(_formName, _formId) {
      return resolveWithTimeout('success')
   }

   deleteFormsAPI(_formId) {
      return resolveWithTimeout(formsData.delete_form_data)
   }

   getQuestionsAPI(formId, _limit, _offset) {
      return resolveWithTimeout(formsData.form_questions[--formId])
   }

   postQuestionsAPI(_formId, _questions) {
      return resolveWithTimeout({})
   }
}

export default FormsAPI
