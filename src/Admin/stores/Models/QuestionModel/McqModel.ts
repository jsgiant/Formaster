import { observable, action } from 'mobx'

import QuestionModel from '.'
import Choice from './ChoiceModel'

class McqModel extends QuestionModel {
   @observable mcqChoices: Array<any> = [{ choice_id: null, choice: '' }]
   @observable responseId: number | null = null

   constructor(type, question?) {
      super(type, question)
      if (question) {
         this.mcqChoices = question.mcq_choices
      }
   }

   @action.bound
   onChangeresponseId(choiceId) {
      this.responseId = parseInt(choiceId)
   }

   @action.bound
   onChangeChoiceText(index, value) {
      this.mcqChoices[index].choice = value
   }

   @action.bound
   onRemoveChoice(index) {
      // this.mcqChoices.remove(choice)
      this.mcqChoices.length > 1 && this.mcqChoices.splice(index, 1)
   }

   @action.bound
   onAddChoice() {
      this.mcqChoices.push({
         choice: '',
         choice_id: null
      })
   }
}

export default McqModel
