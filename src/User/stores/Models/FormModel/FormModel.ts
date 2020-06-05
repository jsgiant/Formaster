import { action, observable } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { getUserDisplayableErrorMessage } from '../../../../Common/utils/APIUtils'
import strings from './../../../../Common/i18n/strings.json'
import { notify, showSuccessMessage } from '../../../../Common/utils/ToastUtils'
import Question from '../QuestionModel/QuestionModel'
import MCQ from '../QuestionModel/McqModel'

class FormModel {
   @observable postResponsesAPIStatus: number
   @observable postResponsesAPIError: any
   id
   name
   formAPI
   @observable questionsList: Array<any> = []

   constructor(form: any, formAPI: any) {
      this.postResponsesAPIError = null
      this.postResponsesAPIStatus = API_INITIAL
      this.formAPI = formAPI
      const { form_name, questions, form_id } = form
      this.id = form_id
      this.name = form_name
      this.initializeQuestions(questions)
   }

   @action.bound
   initializeQuestions(questions) {
      this.questionsList = questions.map(question => {
         if (this.isMCQ(question.question_type)) {
            return new MCQ(question)
         }
         return new Question(question)
      })
   }

   @action.bound
   setPostResponsesAPIStatus(apiStatus) {
      this.postResponsesAPIStatus = apiStatus
   }

   @action.bound
   setPostResponsesAPIError(apiError) {
      this.postResponsesAPIError = apiError
   }

   postSubmittedResponses = formId => {
      const postPromise = this.formAPI.postResponsesAPI(
         formId,
         this.getSubmittedData()
      )
      return bindPromiseWithOnSuccess(postPromise)
         .to(this.setPostResponsesAPIStatus, res =>
            showSuccessMessage('Submitted!')
         )
         .catch(e => notify(getUserDisplayableErrorMessage(e)))
   }

   getSubmittedData = () => {
      let text_responses: any[] = []
      let choice_responses: any[] = []
      this.questionsList.map(question => {
         const { questionId, response } = question
         if (this.isMCQ(question.type)) {
            const { responseId } = question
            choice_responses.push({
               question_id: questionId,
               user_choice_id: responseId
            })
         } else {
            text_responses.push(this.getResponseObject(questionId, response))
         }
      })
      return { text_responses, choice_responses }
   }

   getResponseObject = (id: number, response: any): any => {
      return { question_id: id, user_response: response }
   }

   isMCQ = type => {
      return type === strings.mcq
   }
}

export default FormModel
