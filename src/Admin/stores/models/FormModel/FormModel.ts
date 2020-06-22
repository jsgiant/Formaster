import { observable, action, toJS } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { notify, showSuccessMessage } from '../../../../Common/utils/ToastUtils'
import { getUserDisplayableErrorMessage } from '../../../../Common/utils/APIUtils'

import strings from '../../../i18n/form-strings.json'
import FormsAPI from '../../../services/FormsService/FormsFixture'
import QuestionStore from '../../QuestionStore'
import { Form } from '../../FormStore/FormStore'
import { QuestionType } from '../QuestionModel/QuestionModel'
import { McqQuestionType } from '../QuestionModel/McqModel'

class FormModel {
   @observable name: string
   @observable postQuestionsAPIStatus: number
   @observable putFormsAPIStatus: number
   @observable postQuestionsAPIError: string | null
   @observable putFormsAPIError: string | null

   formService: FormsAPI
   questionStore: QuestionStore
   id: number | undefined

   constructor(
      form: Form,
      formService: FormsAPI,
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
   setPutFormsAPIStatus(apiStatus: number): void {
      this.putFormsAPIStatus = apiStatus
   }

   @action.bound
   setPutFormsAPIError(apiError: string): void {
      console.log(apiError)
      this.putFormsAPIError = getUserDisplayableErrorMessage(apiError)
      notify(this.putFormsAPIError)
   }

   @action.bound
   setPostQuestionsAPIStatus(apiStatus: number): void {
      this.postQuestionsAPIStatus = apiStatus
   }

   @action.bound
   setPostQuestionsAPIError(apiError: string): void {
      this.postQuestionsAPIError = getUserDisplayableErrorMessage(apiError)
      notify(this.postQuestionsAPIError)
   }

   showSuccessMessage = (): void => {
      showSuccessMessage('Changes saved!')
   }

   @action.bound
   onRenameForm(name: string): Promise<any> {
      const putFormPromise = this.formService.putFormsAPI(name, this.id)
      return bindPromiseWithOnSuccess(putFormPromise)
         .to(this.setPutFormsAPIStatus, response => {
            this.name = name
            this.showSuccessMessage()
         })
         .catch(e => this.setPutFormsAPIError(e))
   }

   @action.bound
   onPublishForm(formId: number): Promise<any> {
      //post call
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
