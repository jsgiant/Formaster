import { action, observable } from 'mobx'
import Question from '../QuestionModel/QuestionModel'

class FormModel {
   id
   name
   @observable questionsList: Array<any> = []

   constructor(form) {
      this.id = form.form_id
      this.name = form.form_name
      this.initializeQuestions(form.questions)
      this.questionsList = form.questions
   }

   @action.bound
   initializeQuestions(questions) {
      this.questionsList = questions.map(question => {
         return new Question(question)
      })
   }
}

export default FormModel
