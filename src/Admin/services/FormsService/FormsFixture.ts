import formsData from '../../fixtures/forms-data.json'

class FormsAPI {
   api: any

   getFormsAPI(limit: number, offset: number): Promise<any> {
      return new Promise(resolve => {
         resolve(formsData)
      })
   }

   postFormsAPI(formName: string): Promise<any> {
      return new Promise((resolve, _) => {
         setTimeout(() => resolve(formsData.post_forms_resonse), 1500)
      })
   }
   putFormsAPI(formName: string, formId: number | undefined): Promise<any> {
      return new Promise(resolve => setTimeout(() => resolve('success'), 2000))
   }

   deleteFormsAPI(formId: number): Promise<any> {
      return new Promise(resolve =>
         setTimeout(() => resolve(formsData.delete_form_data), 2000)
      )
   }

   getQuestionsAPI(
      formId: number,
      limit: number,
      offset: number
   ): Promise<any> {
      return new Promise(resolve => {
         setTimeout(() => resolve(formsData.form_questions[--formId]), 2000)
      })
   }

   postQuestionsAPI(
      formId: number,
      questions: { questions: object[] }
   ): Promise<any> {
      return new Promise(resolve => setTimeout(() => resolve('success'), 1500))
   }
}

export default FormsAPI
