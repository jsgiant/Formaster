import { observable, action } from 'mobx'
import strings from './../../i18n/form-strings.json'
import QuestionModel from '../models/QuestionModel'
import McqModel, { McqQuestionType } from '../models/QuestionModel/McqModel'
import { QuestionType } from '../models/QuestionModel/QuestionModel'

class QuestionStore {
   @observable questionsList!: Array<QuestionModel | McqModel>

   constructor(
      questionsList: Array<QuestionType | McqQuestionType> | object[]
   ) {
      this.initializeQuestions(questionsList)
   }

   @action.bound
   initializeQuestions(questionsList: Array<any>): void {
      this.questionsList = questionsList.map(question => {
         if (question.question_type === strings.mcq) {
            return new McqModel(question.question_type, question)
         }
         return new QuestionModel(question.question_type, question)
      })
   }

   @action.bound
   onAddQuestion(
      questionType: string
   ): (QuestionModel | McqModel)[] | undefined {
      switch (questionType) {
         case strings.mcq:
            if (this.hasQuestion(strings.thankyou_screen)) {
               return this.questionsList.splice(
                  this.questionsList.length - 1,
                  0,
                  new McqModel(questionType)
               )
            }
            this.questionsList.push(new McqModel(questionType))
            return this.questionsList
         case strings.welcome_screen:
            if (this.hasQuestion(questionType)) {
               return
            }
            this.questionsList.unshift(new QuestionModel(questionType))
            return this.questionsList
         case strings.thankyou_screen:
            if (this.hasQuestion(questionType)) {
               return
            }
            this.questionsList.push(new QuestionModel(questionType))
            return this.questionsList
         default:
            if (this.hasQuestion(strings.thankyou_screen)) {
               return this.questionsList.splice(
                  this.questionsList.length - 1,
                  0,
                  new QuestionModel(questionType)
               )
            }
            this.questionsList.push(new QuestionModel(questionType))
            return this.questionsList
      }
   }

   hasQuestion = (question_type: string) =>
      this.questionsList.find(question => question.type === question_type)

   @action.bound
   onDeleteQuestion(question: QuestionModel | McqModel): void {
      this.questionsList.filter(eachQuestion => eachQuestion !== question)
   }
}

export { QuestionStore }
