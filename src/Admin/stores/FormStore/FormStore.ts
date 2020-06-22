import { observable, action } from 'mobx'

import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { notify, showSuccessMessage } from '../../../Common/utils/ToastUtils'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'
import FormsAPI from '../../services/FormsService/FormsFixture'

import FormModel from '../models/FormModel'
import QuestionStore from '../QuestionStore'

export type Form = {
   form_id?: number | undefined
   form_name: string
   questions?: Array<object>
}
export interface formsResponse {
   total: number
   forms: Array<Form>
   test_forms: Array<object>
}
class FormStore {
   @observable formList!: Array<FormModel>
   @observable currentForm!: FormModel | null
   @observable getFormsDataAPIStatus!: number
   @observable getFormsDataAPIError!: string | null
   @observable postFormsAPIStatus!: number
   @observable deleteFormsAPIStatus!: number
   @observable updateFormsAPIError!: string | null
   @observable getQuestionsAPIStatus!: number
   @observable getQuestionsAPIError!: string | null
   @observable offset!: number
   @observable initialLimit!: number

   formService: any

   constructor(formService: FormsAPI) {
      this.formService = formService
      this.init()
   }

   @action.bound
   init(): void {
      this.getFormsDataAPIStatus = API_INITIAL
      this.postFormsAPIStatus = API_INITIAL
      this.deleteFormsAPIStatus = API_INITIAL
      this.getQuestionsAPIStatus = API_INITIAL
      this.getFormsDataAPIError = null
      this.getQuestionsAPIError = null
      this.updateFormsAPIError = null
      this.currentForm = null
      this.formList = []
      this.offset = 0
      this.initialLimit = 100
   }

   @action.bound
   setGetFormDataAPIStatus(apiStatus: number): void {
      this.getFormsDataAPIStatus = apiStatus
   }

   @action.bound
   setGetFormDataAPIError(apiError: string): void {
      this.getFormsDataAPIError = apiError
   }

   @action.bound
   setGetFormDataAPIResponse(formsData: formsResponse) {
      this.formList = formsData.forms.map(form => {
         const questionStore = form.questions
            ? new QuestionStore(form.questions)
            : new QuestionStore([])
         return new FormModel(form, this.formService, questionStore)
      })
   }

   @action.bound
   setPostFormsAPIStatus(apiStatus: number): void {
      this.postFormsAPIStatus = apiStatus
   }

   @action.bound
   setPostFormsAPIResponse(postFormsResponse: Form) {
      const questionStore = postFormsResponse.questions
         ? new QuestionStore(postFormsResponse.questions)
         : new QuestionStore([])
      this.formList.unshift(
         new FormModel(postFormsResponse, this.formService, questionStore)
      )
   }

   @action.bound
   setDeleteFormsAPIStatus(apiStatus: number): void {
      this.deleteFormsAPIStatus = apiStatus
   }

   @action.bound
   setUpdateFormError(apiError: string): void {
      notify(getUserDisplayableErrorMessage(apiError))
   }

   @action.bound
   setGetQuestionsAPIStatus(apiStatus: number): void {
      this.getQuestionsAPIStatus = apiStatus
   }

   @action.bound
   setGetQuestionsAPIError(apiError: string): void {
      this.getQuestionsAPIError = apiError
   }

   @action.bound
   setGetQuestionsAPIResponse(apiResponse: Form): void {
      const questionStore = apiResponse.questions
         ? new QuestionStore(apiResponse.questions)
         : new QuestionStore([])
      this.currentForm = new FormModel(
         apiResponse,
         this.formService,
         questionStore
      )
   }

   @action.bound
   getUserForms(): void {
      const getFormsPromise = this.formService.getFormsAPI(
         this.initialLimit,
         this.offset
      )
      this.onBindPromiseWithOnSuccess(
         getFormsPromise,
         this.setGetFormDataAPIStatus,
         this.setGetFormDataAPIResponse,
         this.setGetFormDataAPIError
      )
   }

   @action.bound
   getFormQuestions(formId: number): void {
      const getQuestionsPromise = this.formService.getQuestionsAPI(
         formId,
         this.initialLimit,
         this.offset
      )
      this.onBindPromiseWithOnSuccess(
         getQuestionsPromise,
         this.setGetQuestionsAPIStatus,
         this.setGetQuestionsAPIResponse,
         this.setGetQuestionsAPIError
      )
   }

   @action.bound
   onCreateForm(formName: string): void {
      const postFormPromise = this.formService.postFormsAPI({
         form_name: formName
      })
      this.onBindPromiseWithOnSuccess(
         postFormPromise,
         this.setPostFormsAPIStatus,
         this.setPostFormsAPIResponse,
         this.setUpdateFormError
      )
   }

   @action.bound
   async onBindPromiseWithOnSuccess(
      promise: Promise<any>,
      setStatus: (status: number) => void,
      onSuccess: (res: any) => void,
      onFailure: (e: string) => void
   ): Promise<any> {
      return bindPromiseWithOnSuccess(promise)
         .to(setStatus, onSuccess)
         .catch(error => onFailure(error))
   }

   @action.bound
   async onDeleteForm(form: FormModel): Promise<any> {
      const deleteFormsResponse = this.formService.deleteFormsAPI(form.id)
      return bindPromiseWithOnSuccess(deleteFormsResponse)
         .to(this.setDeleteFormsAPIStatus, _ => {
            showSuccessMessage(`${form.name} successfully deleted!`)
            this.formList = this.formList.filter(eachForm => eachForm !== form)
         })
         .catch(error => this.setUpdateFormError(error))
   }
}

export { FormStore }
