import { observable, action } from 'mobx'
import QuestionModel from '.'

class McqModel extends QuestionModel {
   @observable mcqChoices: Array<string> = []

   constructor(question) {
      super(question)
      this.mcqChoices = question.choices
   }

   @action.bound
   onChangeChoiceText(index, text) {
      this.mcqChoices[index] = text
   }

   @action
   onAddNewChoice() {
      this.mcqChoices.push('')
   }
}

export default McqModel
