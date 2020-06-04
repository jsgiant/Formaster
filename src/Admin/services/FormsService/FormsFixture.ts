import formsData from '../../fixtures/forms-data.json'
import updatedFormData from '../../fixtures/updated-forms-data.json'

class FormsAPI {
   api

   getFormsAPI(limit, offset) {
      return new Promise((resolve, reject) => {
         setTimeout(() => resolve(formsData), 2000)
      })
   }

   postFormsAPI(formName: string) {
      return new Promise((resolve, reject) => {
         setTimeout(() => resolve(formsData.post_forms_resonse), 1500)
         // reject(new Error('try again!'))
      })
   }

   //just for testing
   getUpdatedFormAPI() {
      return new Promise(resolve => {
         setTimeout(() => resolve(updatedFormData), 2000)
      })
   }

   //just for testing
   getUpdatedFormsAPI() {
      return new Promise(resolve => {
         setTimeout(() => resolve(formsData.delete_form_data), 2000)
      })
   }

   putFormsAPI(formname: string, formId: number) {
      return new Promise(resolve => setTimeout(() => resolve('success'), 2000))
   }

   deleteFormsAPI(formId: number) {
      return new Promise(resolve =>
         setTimeout(() => resolve(formsData.delete_form_data), 2000)
      )
   }

   getQuestionsAPI(formId: number, limit, offset) {
      return new Promise(resolve => {
         setTimeout(() => resolve(formsData.form_questions[--formId]), 2000)
      })
   }

   postQuestionsAPI(formId: number, questions) {
      return new Promise(resolve => setTimeout(() => resolve('success'), 1500))
   }
}

export default FormsAPI
