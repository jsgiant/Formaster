import { observable, action } from 'mobx'
import QuestionModel from '../Models/QuestionModel'

class QuestionStore {
   @observable questionsList

   constructor(questionsList) {
      this.getQuestions(questionsList)
   }

   @action.bound
   getQuestions(questionsList) {
      this.questionsList = questionsList.map(question => {
         return new QuestionModel(question)
      })
   }

   @action.bound
   onAddQuestion(question) {
      this.questionsList.push(new QuestionModel(question))
   }

   @action.bound
   onDeleteQuestion(question) {
      this.questionsList.remove(question)
   }
}

export { QuestionStore }
