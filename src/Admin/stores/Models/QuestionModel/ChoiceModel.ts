import { observable, action } from 'mobx'

class Choice {
   @observable choice: string
   choice_id: number | null
   constructor(choice: string, choiceId: number | null) {
      this.choice = choice
      this.choice_id = choiceId
   }

   @action.bound
   onChangeChoice(choice) {
      this.choice = choice
   }
}

export default Choice
