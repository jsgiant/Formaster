import { observable, action } from 'mobx'

export interface QuestionType {
   question_id: number
   question_text: string
   question_type: string
   position_number: number
   is_required: boolean
   description: string
   response: string
}
class QuestionModel {
   questionId: number | null = null
   @observable type: string = ''
   @observable questionTitle: string = ''
   @observable description: string = ''
   @observable isRequired: boolean = false
   @observable hasDescription: boolean
   @observable imageURL: string = ''
   @observable position: number | null = null
   @observable response: string = ''

   constructor(type: string, question?: QuestionType) {
      this.hasDescription = false
      this.type = type
      if (question) {
         this.initializeQuestion(question)
      }
   }

   @action.bound
   initializeQuestion(question: QuestionType): void {
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
   onChangeResponse(updatedResponse: string): void {
      this.response = updatedResponse
   }

   @action.bound
   onChangeTitle(title: string): void {
      this.questionTitle = title
   }

   @action.bound
   onChangeHasDescription(): void {
      this.hasDescription = !this.hasDescription
   }

   @action.bound
   onChangeIsRequired(): void {
      this.isRequired = !this.isRequired
   }

   @action.bound
   onChangeDescription(description: string): void {
      this.description = description
   }
}

export { QuestionModel }
