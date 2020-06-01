import { create } from 'apisauce'
import { paths } from '../../Common/constants/Paths'
import { getAccessToken } from '../../Common/utils/StorageUtils'
import { networkCallWithApisauce } from '../../Common/utils/APIUtils'
import { apiMethods } from '../../Common/constants/APIConstants'

class UserFormsAPI {
   api

   constructor() {
      this.api = create({
         baseURL: `${paths.baseURL}`,
         headers: { Authorization: `Bearer ${getAccessToken()}` }
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
}

export default UserFormsAPI
