import { observable, action } from 'mobx'
import Question from './QuestionModel'

class MCQ extends Question {
   choices: Array<any>
   @observable responseId: any

   constructor(question) {
      super(question)
      const { choices, response_id } = question
      this.choices = choices
      this.responseId = response_id
   }

   @action.bound
   onChangeresponseId(responseId) {
      this.responseId = responseId
   }
}

export default MCQ
