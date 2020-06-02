import { observable, action } from 'mobx'
import QuestionModel from '.'
import Choice from './ChoiceModel'

class McqModel extends QuestionModel {
   @observable mcqChoices: Array<any> = ['']
   @observable responseId: any = null

   constructor(type, question?) {
      super(type, question)
      if (question) {
         this.mcqChoices = question.choices
      }
   }

   @action.bound
   onChangeresponseId(choiceId) {
      this.responseId = parseInt(choiceId)
   }

   @action.bound
   onChangeChoiceText(index, value) {
      console.log(value, index)
      this.mcqChoices[index].choice = value
   }

   @action.bound
   onAddOrRemoveChoice(keyCode, index, value) {
      if (keyCode === 13 && value !== '') {
         this.mcqChoices.push({
            choice: '',
            choice_id: this.mcqChoices.length + 1
         })
      } else if (value === '' && keyCode === 8) {
         if (this.mcqChoices.length !== 1) {
            this.mcqChoices.splice(index, 1)
         }
      }
   }
}

export default McqModel
