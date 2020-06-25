import { create } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { paths } from '../../../Common/constants/Paths'

import urls from '../../i18n/urls.json'
import FormService from '.'

class FormsAPI implements FormService {
   api: Record<string, any>

   constructor() {
      this.api = create({
         baseURL: `${paths.baseURL}`
      })
   }

   async getFormsAPI(limit, offset) {
      return networkCallWithApisauce(
         this.api,
         `${urls.get_forms}?limit=${limit}&offset=${offset}`,
         {},
         apiMethods.get
      )
   }

   async postFormsAPI(formname) {
      return networkCallWithApisauce(
         this.api,
         `${urls.create_form}`,
         formname,
         apiMethods.post
      )
   }

   async putFormsAPI(formName, formId) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/v1/`,
         formName,
         apiMethods.put
      )
   }

   deleteFormsAPI(formId) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/v1/`,
         {},
         apiMethods.delete
      )
   }

   getQuestionsAPI(formId, limit, offset) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/questions/v1/?limit=${limit}&offset=${offset}`,
         {},
         apiMethods.get
      )
   }

   postQuestionsAPI(formId, questions) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/questions/v1/`,
         questions,
         apiMethods.post
      )
   }

   putQuestionsAPI(formId, questions) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/questions/v1/`,
         questions,
         apiMethods.put
      )
   }
}

export default FormsAPI
