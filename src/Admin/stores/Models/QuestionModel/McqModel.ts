import { observable, action } from 'mobx'
import QuestionModel from '.'

class McqModel extends QuestionModel {
   @observable mcqChoices: Array<any> = [{ title: '', isSelected: false }]

   constructor(type, question?) {
      super(type, question)
      if (question) {
         this.init(question)
      }
   }

   @action.bound
   init(question) {
      this.mcqChoices = question.choices
   }

   @action.bound
   onChangeChoiceText(e) {
      this.mcqChoices[e.target.tabIndex] = e.target.value
      console.log(this.mcqChoices[e.target.tabIndex])
   }

   @action
   onAddNewChoice() {
      this.mcqChoices.push('')
   }
}

export default McqModel
