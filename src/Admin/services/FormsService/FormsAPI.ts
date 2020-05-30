import { create } from 'apisauce'
import { getAccessToken } from '../../../Common/utils/StorageUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import urls from '../../i18n/urls.json'

class FormsAPI {
   api

   constructor() {
      this.api = create({
         baseURL: `${urls.baseURL}`,
         headers: { Authorization: `Bearer ${getAccessToken()}` }
      })
   }

   getFormsAPI() {
      return networkCallWithApisauce(
         this.api,
         urls.get_forms,
         {},
         apiMethods.get
      )
   }

   postFormsAPI(formname: string) {
      return networkCallWithApisauce(
         this.api,
         `${urls.create_form}`,
         { formname },
         apiMethods.post
      )
   }

   putFormsAPI(formname: string, formId: number) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/v1/`,
         { formname },
         apiMethods.put
      )
   }

   deleteFormsAPI(formId: number) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/v1/`,
         {},
         apiMethods.delete
      )
   }

   getQuestionsAPI(formId: number) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/questions/v1`,
         {},
         apiMethods.get
      )
   }

   postQuestionsAPI(formId: number, questions) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/questions/v1`,
         { questions },
         apiMethods.post
      )
   }

   putQuestionsAPI(formId: number, questions) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/questions/v1`,
         { questions },
         apiMethods.put
      )
   }
}

export default FormsAPI
