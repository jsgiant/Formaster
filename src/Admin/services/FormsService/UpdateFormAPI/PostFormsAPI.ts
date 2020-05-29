import { create } from 'apisauce'
import formsData from './../../../fixtures/forms-data.json'

class PostFormsAPI {
   api

   constructor() {
      this.api = create({
         baseURL: '/form/{form_id}/v1'
      })
   }

   updateFormsAPI(formname) {
      return new Promise(resolve => {
         resolve(formsData.put_forms_data)
      })
   }
}
