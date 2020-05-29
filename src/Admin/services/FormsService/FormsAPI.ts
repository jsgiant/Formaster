import { create } from 'apisauce'
import { getAccessToken } from '../../../common/utils/StorageUtils'
import { apiMethods } from '../../../common/constants/APIConstants'
import urls from '../../i18n/urls.json'
import { networkCallWithApisauce } from '../../../common/utils/APIUtils'

class FormsAPI {
   api

   constructor() {
      this.api = create({
         baseURL: `${urls.baseURL}`,
         headers: { Authorization: `bearer ${getAccessToken()}` }
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

   putFormsAPI(formname: string) {
      return networkCallWithApisauce(
         this.api,
         `${urls.rename_form}`,
         { formname },
         apiMethods.put
      )
   }

   deleteFormsAPI(formId: number) {
      return networkCallWithApisauce(
         this.api,
         `${urls.delete_form}`,
         { formId },
         apiMethods.delete
      )
   }
}

export default FormsAPI
