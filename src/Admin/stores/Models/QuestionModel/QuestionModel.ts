import { observable, action } from 'mobx'

class QuestionModel {
   id
   @observable type: string = ''
   @observable title: string = ''
   @observable description: any = ''
   @observable isRequired: boolean = false
   @observable hasDescription: boolean
   @observable imageURL: string = ''

   constructor(type, question?) {
      this.hasDescription = false
      this.type = type
      if (question) {
         this.init(question)
      }
   }

   @action.bound
   init(question) {
      this.title = question.title
      this.description = question.description
      this.isRequired = question.isRequired
      this.id = question.id
      this.imageURL = question.imageURL
   }

   @action.bound
   onChangeTitle(title) {
      this.title = title
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
