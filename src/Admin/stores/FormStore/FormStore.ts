import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import formData from '../../fixtures/forms-data.json'
import FormModel from '../Models/FormModel'

class FormStore {
   @observable formList
   @observable getFormsDataAPIStatus
   @observable getFormsDataAPIError
   getFormsAPIService

   constructor(getFormsAPIService) {
      this.getFormsAPIService = getFormsAPIService
      this.init()
   }

   @action.bound
   init() {
      this.getFormsDataAPIStatus = API_INITIAL
      this.getFormsDataAPIError = null
   }

   @action.bound
   setGetFormDataAPIStatus(apiStatus) {
      this.getFormsDataAPIStatus = apiStatus
   }

   @action.bound
   setGetFormDataAPIError(apiError) {
      this.getFormsDataAPIError = apiError
   }

   @action.bound
   setGetFormDataAPIResponse(formsData) {
      this.formList = formsData.forms.map(form => {
         return new FormModel(form)
      })
   }

   @action.bound
   getUserForms() {
      // this.setGetFormDataAPIResponse(formData)
      const getFormsPromise = this.getFormsAPIService.getFormsAPI()
      return bindPromiseWithOnSuccess(getFormsPromise)
         .to(this.setGetFormDataAPIStatus, this.setGetFormDataAPIResponse)
         .catch(error => this.setGetFormDataAPIError(error))
   }

   @action.bound
   onCreateForm(form) {
      this.formList.push(new FormModel(form))
   }

   @action.bound
   onDeleteForm(form) {
      this.formList.remove(form)
   }
}

export { FormStore }
