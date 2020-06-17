import { observable, action } from 'mobx'

class Choice {
   @observable choice
   choice_id
   constructor(choice, choiceId) {
      this.choice = choice
      this.choice_id = choiceId
   }

   @action.bound
   onChangeChoice(choice) {
      this.choice = choice
   }
}

export default Choice
