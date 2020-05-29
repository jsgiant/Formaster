import { observable, action } from 'mobx'

class QuestionModel {
   id: number
   @observable type: string
   @observable title: string
   @observable description: any
   @observable isRequired: boolean
   @observable hasDescription: boolean
   @observable imageURL: string

   constructor(question) {
      this.hasDescription = false
      this.title = question.title
      this.description = question.description
      this.isRequired = question.isRequired
      this.type = question.type
      this.id = question.id
      this.imageURL = question.imageURL
   }

   @action.bound
   onChangeTitle(e: any) {
      this.title = e.target.value
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
