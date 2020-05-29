import { observable, action } from 'mobx'

class QuestionModel {
   id: number
   @observable type: string
   @observable title: string
   @observable description: any
   @observable isRequired: boolean
   @observable response: any
   @observable hasDescription: boolean
   @observable imageURL: string
   @observable mcq_choices: Array<string> = []

   constructor(question) {
      this.hasDescription = false
      this.title = question.title
      this.description = question.description
      this.isRequired = question.isRequired
      this.response = question.response
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

   @action.bound
   onAddChoiceToMCQ(choice: string) {
      this.mcq_choices.push(choice)
   }

   @action.bound
   onChangeResponse(response) {
      this.response = response
   }
}

export { QuestionModel }

// question_id
// question_text
// question_type
// description
// required
// mcq_details:{
//     choices:[]
// }
// rating_details:{

// }
