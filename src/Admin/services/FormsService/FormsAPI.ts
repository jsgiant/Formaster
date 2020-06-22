import { create } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { paths } from '../../../Common/constants/Paths'

import urls from '../../i18n/urls.json'

class FormsAPI {
   api: any

   constructor() {
      this.api = create({
         baseURL: `${paths.baseURL}`
      })
   }

   getFormsAPI(limit: number, offset: number): Promise<any> {
      return networkCallWithApisauce(
         this.api,
         `${urls.get_forms}?limit=${limit}&offset=${offset}`,
         {},
         apiMethods.get
      )
   }

   postFormsAPI(formname: string): Promise<any> {
      return networkCallWithApisauce(
         this.api,
         `${urls.create_form}`,
         formname,
         apiMethods.post
      )
   }

   putFormsAPI(formName: string, formId: number | undefined): Promise<any> {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/v1/`,
         formName,
         apiMethods.put
      )
   }

   deleteFormsAPI(formId: number): Promise<any> {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/v1/`,
         {},
         apiMethods.delete
      )
   }

   getQuestionsAPI(
      formId: number,
      limit: number,
      offset: number
   ): Promise<any> {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/questions/v1/?limit=${limit}&offset=${offset}`,
         {},
         apiMethods.get
      )
   }

   postQuestionsAPI(formId: number, questions): Promise<any> {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/questions/v1/`,
         questions,
         apiMethods.post
      )
   }

   putQuestionsAPI(
      formId: number,
      questions: { questions: never[] }
   ): Promise<any> {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/questions/v1/`,
         questions,
         apiMethods.put
      )
   }
}

export default FormsAPI
