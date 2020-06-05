import { create } from 'apisauce'
import { paths } from '../../Common/constants/Paths'
import { getAccessToken } from '../../Common/utils/StorageUtils'
import { networkCallWithApisauce } from '../../Common/utils/APIUtils'
import { apiMethods } from '../../Common/constants/APIConstants'

class UserFormsAPI {
   api

   constructor() {
      this.api = create({
         baseURL: `${paths.baseURL}`
      })
   }

   getUserFormsAPI() {
      return networkCallWithApisauce(
         this.api,
         `/forms/v1/?limit=${100}&offset=${0}`,
         {},
         apiMethods.get
      )
   }

   getQuestionsAPI(formId) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/response/v1/?limit=${100}&offset=${0}`,
         {},
         apiMethods.get
      )
   }

   postResponsesAPI(formId, responses) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/response/v1/`,
         responses,
         apiMethods.post
      )
   }
}

export default UserFormsAPI
