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
         paths.getFormsUrl,
         {},
         apiMethods.get
      )
   }

   getQuestionsAPI(formId) {
      return networkCallWithApisauce(
         this.api,
         `/form/${formId}/questions`,
         {},
         apiMethods.get
      )
   }
}

export default UserFormsAPI
