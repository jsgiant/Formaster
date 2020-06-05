import { observable, action } from 'mobx'

class QuestionModel {
   questionId = null
   @observable type = ''
   @observable questionTitle = ''
   @observable description = ''
   @observable isRequired = false
   @observable hasDescription
   @observable imageURL = ''
   @observable position = null
   @observable response = ''

   constructor(type, question?) {
      this.hasDescription = false
      this.type = type
      if (question) {
         this.initializeQuestion(question)
      }
   }

   @action.bound
   initializeQuestion(question) {
      const {
         question_text,
         is_required,
         description,
         question_id,
         position_number
      } = question
      this.questionTitle = question_text
      this.description = description
      this.isRequired = is_required
      this.questionId = question_id
      this.position = position_number
   }

   @action.bound
   onChangeResponse(updatedResponse) {
      this.response = updatedResponse
   }

   @action.bound
   onChangeTitle(title) {
      this.questionTitle = title
   }

   @action.bound
   onChangeHasDescription() {
      this.hasDescription = !this.hasDescription
   }

   @action.bound
   onChangeIsRequired() {
      this.isRequired = !this.isRequired
   }

   @action.bound
   onChangeDescription(description) {
      this.description = description
   }
}

export { QuestionModel }
