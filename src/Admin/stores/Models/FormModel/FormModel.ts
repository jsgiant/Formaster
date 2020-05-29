import { observable, action } from 'mobx'
import QuestionStore from '../../QuestionStore'

class FormModel {
   @observable name: string
   questionStore
   id

   constructor(form) {
      this.name = form.name
      this.id = form.id
      this.questionStore = new QuestionStore(form.questions)
   }

   @action.bound
   onRenameForm(name) {
      this.name = name
   }
}

export { FormModel }
