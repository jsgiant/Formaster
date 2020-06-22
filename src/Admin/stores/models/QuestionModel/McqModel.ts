import { observable, action } from 'mobx'

import { QuestionType } from './QuestionModel'
import QuestionModel from '.'

export interface McqQuestionType extends QuestionType {
   mcq_choices: Array<McqType>
}
export type McqType = {
   choice: string
   choice_id: number | null
}

class McqModel extends QuestionModel {
   @observable mcqChoices: Array<McqType> = [{ choice: '', choice_id: null }]
   @observable responseId: number | null = null

   constructor(type: string, question?: McqQuestionType) {
      super(type, question)
      if (question) {
         this.mcqChoices = question.mcq_choices
      }
   }

   @action.bound
   onChangeresponseId(choiceId: string): void {
      this.responseId = parseInt(choiceId)
   }

   @action.bound
   onChangeChoiceText(index: number, value: string): void {
      this.mcqChoices[index].choice = value
   }

   @action.bound
   onRemoveChoice(index: number): void {
      this.mcqChoices.length > 1 && this.mcqChoices.splice(index, 1)
   }

   @action.bound
   onAddChoice(): void {
      this.mcqChoices.push({ choice: '', choice_id: null })
   }
}

export default McqModel
