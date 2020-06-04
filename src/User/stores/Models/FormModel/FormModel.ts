import { action, observable } from 'mobx'
import strings from './../../../../Common/i18n/strings.json'
import Question from '../QuestionModel/QuestionModel'
import MCQ from '../QuestionModel/McqModel'

class FormModel {
   id
   name
   formAPI
   @observable questionsList: Array<any> = []

   constructor(form: any, formAPI: any) {
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
      return { question_id: id, response: response }
   }

   postSubmittedResponses = () => {
      // console.log(this.questionsList)
      console.log(this.getSubmittedData())
      this.formAPI.postResponsesAPI(this.id, this.getSubmittedData())
   }

   isMCQ = type => {
      return type === strings.mcq
   }
}

export default FormModel
