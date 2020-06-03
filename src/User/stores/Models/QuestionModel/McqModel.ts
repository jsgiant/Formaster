import { observable, action } from 'mobx'
import Question from './QuestionModel'

class MCQ extends Question {
   mcqChoices: Array<any>
   @observable responseId: number | null = null

   constructor(question) {
      super(question)
      const { mcq_choices, response_id } = question
      this.mcqChoices = mcq_choices
      this.responseId = response_id
   }

   @action.bound
   onChangeresponseId(responseId) {
      this.responseId = responseId
   }
}

export default MCQ
