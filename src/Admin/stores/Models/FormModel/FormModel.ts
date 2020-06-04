import { observable, action, toJS } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import strings from './../../../i18n/form-strings.json'
import QuestionStore from '../../QuestionStore'

class FormModel {
   @observable name: string
   @observable postQuestionsAPIStatus: number
   @observable postQuestionsAPIError: any
   @observable putFormsAPIStatus: any
   @observable putFormsAPIError: any

   formService
   questionStore
   id

   constructor(form, formService) {
      const { form_name, form_id, questions } = form
      this.name = form_name
      this.id = form_id
      if (questions) {
         this.questionStore = new QuestionStore(form.questions)
      }
      this.formService = formService
      this.postQuestionsAPIStatus = API_INITIAL
      this.putFormsAPIStatus = API_INITIAL
      this.putFormsAPIError = null
      this.postQuestionsAPIError = null
   }

   @action.bound
   setPutFormsAPIStatus(apiStatus) {
      this.putFormsAPIStatus = apiStatus
   }

   @action.bound
   setPutFormsAPIError(apiError) {
      this.putFormsAPIError = apiError
   }

   @action.bound
   setPostQuestionsAPIStatus(apiStatus) {
      this.postQuestionsAPIStatus = apiStatus
   }

   @action.bound
   setPostQuestionsAPIError(apiError) {
      this.postQuestionsAPIError = apiError
   }

   @action.bound
   setPostQuestionsAPIResponse(apiResponse) {
      console.log(apiResponse)
   }

   @action.bound
   onRenameForm(name) {
      const putFormPromise = this.formService.putFormsAPI(
         {
            form_name: name
         },
         this.id
      )
      return bindPromiseWithOnSuccess(putFormPromise)
         .to(this.setPutFormsAPIStatus, response => (this.name = name))
         .catch(e => this.setPutFormsAPIError)
   }

   @action.bound
   onPublishForm(formId: number) {
      //post call
      const postQuestionsPromise = this.formService.postQuestionsAPI(
         formId,
         this.getDataToPost()
      )
      return bindPromiseWithOnSuccess(postQuestionsPromise)
         .to(this.setPostQuestionsAPIStatus, this.setPostQuestionsAPIError)
         .catch(e => this.setPostQuestionsAPIError(e))
   }

   getDataToPost = () => {
      const { questionsList } = this.questionStore
      let postData = []
      postData = questionsList.map(question => {
         let choices = []
         const {
            questionId,
            type,
            position,
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
            position_number: position,
            question_text: questionTitle,
            image_url: imageURL,
            is_required: isRequired,
            description: description,
            mcq_choices: choices
         }
      })
      console.log({ questions: postData })
      return { questions: postData }
   }
}

export { FormModel }
