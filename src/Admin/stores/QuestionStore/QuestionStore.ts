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
         if (question.question_type === strings.mcq) {
            return new McqModel(question.question_type, question)
         }
         return new QuestionModel(question.question_type, question)
      })
   }

   @action.bound
   onAddQuestion(questionType) {
      switch (questionType) {
         case strings.mcq:
            if (this.hasQuestion(strings.thankyou_screen)) {
               return this.questionsList.splice(
                  this.questionsList.length - 1,
                  0,
                  new McqModel(questionType)
               )
            }
            return this.questionsList.push(new McqModel(questionType))
         case strings.welcome_screen:
            if (this.hasQuestion(questionType)) {
               return
            }
            return this.questionsList.unshift(new QuestionModel(questionType))
         case strings.thankyou_screen:
            if (this.hasQuestion(questionType)) {
               return
            }
            return this.questionsList.push(new QuestionModel(questionType))
         default:
            if (this.hasQuestion(strings.thankyou_screen)) {
               return this.questionsList.splice(
                  this.questionsList.length - 1,
                  0,
                  new QuestionModel(questionType)
               )
            }
            return this.questionsList.push(new QuestionModel(questionType))
      }
   }

   hasQuestion = question_type => {
      return this.questionsList.find(
         question => question.type === question_type
      )
   }

   @action.bound
   onDeleteQuestion(question) {
      this.questionsList.remove(question)
   }
}

export { QuestionStore }
