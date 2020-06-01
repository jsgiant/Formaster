class FormModel {
   id
   name
   questionsList: Array<any> = []

   constructor(form) {
      this.id = form.form_id
      this.name = form.form_name
      this.questionsList = form.questions
   }
}

export default FormModel
