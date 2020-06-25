import { observable, action, toJS } from 'mobx'
import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { notify, showSuccessMessage } from '../../../../Common/utils/ToastUtils'
import { getFormattedErrorDescription } from '../../../../Common/utils/APIUtils'

import strings from '../../../i18n/form-strings.json'
import FormService from '../../../services/FormsService'

import QuestionStore from '../../QuestionStore'
import { FormType } from '../../types'

class FormModel {
   @observable name: string
   @observable postQuestionsAPIStatus: APIStatus
   @observable putFormsAPIStatus: APIStatus
   @observable postQuestionsAPIError: string | null
   @observable putFormsAPIError: string | null

   formService: FormService
   questionStore: QuestionStore
   id: number | undefined

   constructor(
      form: FormType,
      formService: FormService,
      questionStore: QuestionStore
   ) {
      const { form_name, form_id } = form
      this.name = form_name
      this.id = form_id
      this.questionStore = questionStore
      this.formService = formService
      this.postQuestionsAPIStatus = API_INITIAL
      this.putFormsAPIStatus = API_INITIAL
      this.putFormsAPIError = null
      this.postQuestionsAPIError = null
   }

   @action.bound
   setPutFormsAPIStatus(apiStatus): void {
      this.putFormsAPIStatus = apiStatus
   }

   @action.bound
   setPutFormsAPIError(apiError): void {
      console.log(apiError)
      this.putFormsAPIError = getFormattedErrorDescription(apiError)
      notify(this.putFormsAPIError)
   }

   @action.bound
   setPostQuestionsAPIStatus(apiStatus: number): void {
      this.postQuestionsAPIStatus = apiStatus
   }

   @action.bound
   setPostQuestionsAPIError(apiError): void {
      this.postQuestionsAPIError = getFormattedErrorDescription(apiError)
      notify(this.postQuestionsAPIError)
   }

   showSuccessMessage = (): void => {
      showSuccessMessage('Changes saved!')
   }

   @action.bound
   onRenameForm(name: string) {
      if (this.id) {
         const putFormPromise = this.formService.putFormsAPI(name, this.id)
         return bindPromiseWithOnSuccess(putFormPromise)
            .to(this.setPutFormsAPIStatus, () => {
               this.name = name
               this.showSuccessMessage()
            })
            .catch(e => this.setPutFormsAPIError(e))
      }
   }

   @action.bound
   onPublishForm(formId: number) {
      const postQuestionsPromise = this.formService.postQuestionsAPI(
         formId,
         this.getDataToPost()
      )
      return bindPromiseWithOnSuccess(postQuestionsPromise)
         .to(this.setPostQuestionsAPIStatus, this.showSuccessMessage)
         .catch(e => this.setPostQuestionsAPIError(e))
   }

   getDataToPost = (): { questions: object[] } => {
      this.questionStore.onAddQuestion(strings.welcome_screen)
      this.questionStore.onAddQuestion(strings.thankyou_screen)
      const { questionsList } = this.questionStore

      const postData = questionsList.map((question: any, index: number) => {
         let choices = []
         const {
            questionId,
            type,
            questionTitle,
            imageURL,
            isRequired,
            description
         } = toJS(question)
         if (type === strings.mcq) {
            choices = toJS(question.mcqChoices)
         }
         return {
            question_id: questionId,
            question_type: type,
            position_number: index,
            question_text: questionTitle,
            image_url: imageURL,
            is_required: isRequired,
            description: description,
            mcq_choices: choices
         }
      })
      return { questions: postData }
   }
}

export { FormModel }
