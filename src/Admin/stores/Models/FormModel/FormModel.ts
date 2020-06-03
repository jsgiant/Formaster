import { observable, action, toJS } from 'mobx'
import strings from './../../../i18n/form-strings.json'
import QuestionStore from '../../QuestionStore'

class FormModel {
   @observable name: string
   questionStore
   id

   constructor(form) {
      const { form_name, form_id, questions } = form
      this.name = form_name
      this.id = form_id
      if (questions) {
         this.questionStore = new QuestionStore(form.questions)
      }
   }

   @action.bound
   onRenameForm(name) {
      this.name = name
   }

   @action.bound
   onPublishForm(formId: number) {
      const { questionsList } = this.questionStore
      const postData = questionsList.map(question => {
         let choices = []
         const {
            id,
            type,
            positionNumber,
            title,
            imageURL,
            isRequired,
            description
         } = toJS(question)
         if (type === strings.mcq) {
            choices = toJS(question.mcqChoices)
         }
         return {
            question_id: id,
            question_type: type,
            position_number: positionNumber,
            question_text: title,
            image_url: imageURL,
            is_required: isRequired,
            description: description,
            mcq_choices: choices
         }
      })
      console.log(formId, { questions: postData })
   }
}

export { FormModel }
