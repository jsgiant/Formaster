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
   onChangeDescription(e: any) {
      this.description = e.target.value
   }
}

export { QuestionModel }
