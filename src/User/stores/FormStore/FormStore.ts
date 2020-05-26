import { observable, ObservableMap, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'

class FormStore {
   @observable formList
   @observable getFormsDataAPIStatus
   @observable getFormsDataAPIError
   formListAPIService

   constructor(formListAPIService) {
      this.formListAPIService = formListAPIService
      this.init()
   }

   @action.bound
   init() {
      this.getFormsDataAPIStatus = API_INITIAL
      this.getFormsDataAPIError = null
   }
}
