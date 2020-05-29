import formsData from '../../fixtures/forms-data.json'
import updatedFormData from '../../fixtures/updated-forms-data.json'

class FormsAPI {
   api

   getFormsAPI() {
      return new Promise((resolve, reject) => {
         setTimeout(() => resolve(formsData), 2000)
      })
   }

   postFormsAPI(formName: string) {
      return new Promise(resolve => {
         resolve(formsData.post_forms_resonse)
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

   putFormsAPI(formname: string) {
      return new Promise(resolve => {
         resolve(formsData.put_forms_data)
      })
   }

   deleteFormsAPI(formId: number) {
      return new Promise(resolve => {
         resolve(formsData.delete_form_data)
      })
   }
}

export default FormsAPI
