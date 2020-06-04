import { create } from 'apisauce'
import { getAccessToken } from '../../../Common/utils/StorageUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import urls from '../../i18n/urls.json'

class FormsAPI {
   api

   constructor() {
      this.api = create({
         baseURL: `${urls.baseURL}`
      })
   }

   getFormsAPI(limit: number, offset: number) {
      return networkCallWithApisauce(
         this.api,
         `${urls.get_forms}?limit=${limit}&offset=${offset}`,
         {},
         apiMethods.get
      )
   }

   postFormsAPI(formname: string) {
      return networkCallWithApisauce(
         this.api,
         `${urls.create_form}`,
         formname,
         apiMethods.post
      )
   }

   putFormsAPI(formname: string, formId: number) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/v1/`,
         formname,
         apiMethods.put
      )
   }

   getUpdatedFormAPI() {
      return new Promise(resolve => {
         setTimeout(() => resolve('success'), 2000)
      })
   }

   getUpdatedFormsAPI() {
      return new Promise(resolve => {
         setTimeout(() => resolve('success'), 2000)
      })
   }

   deleteFormsAPI(formId: number) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/v1/`,
         {},
         apiMethods.delete
      )
   }

   getQuestionsAPI(formId: number, limit: number, offset: number) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/questions/v1/?limit=${limit}&offset=${offset}`,
         {},
         apiMethods.get
      )
   }

   postQuestionsAPI(formId: number, questions) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/questions/v1/`,
         questions,
         apiMethods.post
      )
   }

   putQuestionsAPI(formId: number, questions) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/questions/v1/`,
         questions,
         apiMethods.put
      )
   }
}

export { FormsAPI }
