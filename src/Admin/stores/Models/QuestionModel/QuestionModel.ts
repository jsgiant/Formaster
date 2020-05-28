import { observable, action } from 'mobx'

class QuestionModel {
   @observable title
   @observable description
   @observable isRequired
   @observable response
   @observable hasDescription: boolean

   constructor(question) {
      this.hasDescription = false
      this.title = question.title
      this.description = question.description
      this.isRequired = question.isRequired
      this.response = question.response
   }

   @action.bound
   onChangeTitle(updatedTitle) {
      this.title = updatedTitle
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

   @action.bound
   onChangeResponse(response) {
      this.response = response
   }
}

export { QuestionModel }
