import { observable } from 'mobx'

class Question {
   @observable response = null
   questionId: number
   questionTitle: string
   type: string
   isRequired: boolean
   description: string

   constructor(question) {
      const { id, title, type, response, isRequired, description } = question
      this.questionId = id
      this.questionTitle = title
      this.type = type
      this.response = response
      this.isRequired = isRequired
      this.description = description
   }

   onChangeResponse(response) {
      this.response = response
   }

   onSubmitResponses() {
      //postAPI call
   }
}

export default Question
