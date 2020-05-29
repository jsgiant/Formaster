import { observable, action } from 'mobx'
import strings from './../../i18n/form-strings.json'
import QuestionModel from '../Models/QuestionModel'
import McqModel from '../Models/QuestionModel/McqModel'

class QuestionStore {
   @observable questionsList

   constructor(questionsList) {
      this.getQuestions(questionsList)
   }

   @action.bound
   getQuestions(questionsList) {
      this.questionsList = questionsList.map(question => {
         if (this.isMCQ(question.type)) {
            return new McqModel(question.type, question)
         }
         return new QuestionModel(question.type, question)
      })
   }

   @action.bound
   onAddQuestion(questionType) {
      if (this.isMCQ(questionType)) {
         this.questionsList.push(new McqModel(questionType))
      } else {
         this.questionsList.push(new QuestionModel(questionType))
      }
   }

   isMCQ = type => {
      return type === strings.mcq
   }

   @action.bound
   onDeleteQuestion(question) {
      this.questionsList.remove(question)
   }
}

export { QuestionStore }
