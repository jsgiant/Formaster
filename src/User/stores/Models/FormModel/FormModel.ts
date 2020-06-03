import { action, observable } from 'mobx'
import strings from './../../../../Common/i18n/strings.json'
import Question from '../QuestionModel/QuestionModel'
import MCQ from '../QuestionModel/McqModel'

class FormModel {
   id
   name
   @observable questionsList: Array<any> = []

   constructor(form: any) {
      const { form_name, questions, form_id } = form
      this.id = form_id
      this.name = form.form_name
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

   postSubmittedResponses = () => {
      // console.log(this.questionsList)
      const postResponse = this.questionsList.map(question => {
         const { questionId, response } = question
         if (this.isMCQ(question.type)) {
            const { responseId } = question
            return { question_id: questionId, user_choice_id: responseId }
         }
         return { question_id: questionId, user_response: response }
      })
      console.log(postResponse)
   }

   isMCQ = type => {
      return type === strings.mcq
   }
}

export default FormModel
