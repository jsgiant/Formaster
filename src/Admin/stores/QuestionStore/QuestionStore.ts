import { observable, action } from 'mobx'
import strings from './../../i18n/form-strings.json'
import QuestionModel from '../models/QuestionModel'
import McqModel from '../models/QuestionModel/McqModel'

class QuestionStore {
   @observable questionsList

   constructor(questionsList) {
      this.initializeQuestions(questionsList)
   }

   @action.bound
   initializeQuestions(questionsList) {
      this.questionsList = questionsList.map(question => {
         if (this.isMCQ(question.question_type)) {
            return new McqModel(question.question_type, question)
         }
         return new QuestionModel(question.question_type, question)
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
