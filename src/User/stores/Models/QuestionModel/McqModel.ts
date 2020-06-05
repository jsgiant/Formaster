import { observable, action } from 'mobx'
import Question from './QuestionModel'

class MCQ extends Question {
   mcqChoices: Array<any>
   @observable responseId: number | null = null

   constructor(question) {
      super(question)
      const { mcq_choices, choice_response_id } = question
      this.mcqChoices = mcq_choices
      this.responseId = choice_response_id
   }

   @action.bound
   onChangeresponseId(responseId) {
      console.log(responseId)
      this.responseId = responseId
   }
}

export default MCQ
