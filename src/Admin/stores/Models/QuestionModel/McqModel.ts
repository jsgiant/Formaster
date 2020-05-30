import { observable, action } from 'mobx'
import QuestionModel from '.'

class McqModel extends QuestionModel {
   @observable mcqChoices: Array<any> = ['']

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
   onChangeChoiceText(index, value) {
      this.mcqChoices[index] = value
   }

   @action.bound
   onAddOrRemoveChoice(keyCode, index, value) {
      if (keyCode === 13 && value !== '') {
         this.mcqChoices.push('')
      } else if (value === '' && keyCode === 8) {
         if (this.mcqChoices.length !== 1) {
            this.mcqChoices.splice(index, 1)
         }
      }
   }
}

export default McqModel
