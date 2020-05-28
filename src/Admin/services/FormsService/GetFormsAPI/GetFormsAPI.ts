import { create } from 'apisauce'
import formsData from './../../../fixtures/forms-data.json'
import { getAccessToken } from '../../../../utils/StorageUtils'
import { apiMethods } from '../../../../constants/APIConstants'
import { networkCallWithApisauce } from '../../../../utils/APIUtils'

class GetFormsAPI {
   api

   constructor() {
      this.api = create({
         baseURL: '/v1/forms',
         headers: { Autherization: `bearer ${getAccessToken()}` }
      })
   }

   getFormsAPI() {
      // return networkCallWithApisauce(this.api, 'v1/abc', {}, apiMethods.get)
      return new Promise((resolve, reject) => {
         resolve(formsData)
      })
   }
}

export { GetFormsAPI }
