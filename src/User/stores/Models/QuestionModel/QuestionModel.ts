import { observable, action } from 'mobx'

class Question {
   @observable response = null
   questionId: number
   questionTitle: string
   type: string
   position: number
   imageURL: string = ''
   isRequired: boolean
   description: string

   constructor(question) {
      console.log(question.user_response)
      const {
         question_id,
         question_text,
         question_type,
         user_response,
         is_required,
         description,
         position_number
      } = question
      this.questionId = question_id
      this.questionTitle = question_text
      this.type = question_type
      this.response = user_response
      this.isRequired = is_required
      this.description = description
      this.position = position_number
   }

   @action.bound
   onChangeResponse(response) {
      this.response = response
   }
}

export default Question
