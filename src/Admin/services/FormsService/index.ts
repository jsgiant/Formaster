import { formsResponse, post_forms_resonse, FormType } from '../../stores/types'

interface FormService {
   getFormsAPI: (limit: number, offset: number) => Promise<formsResponse>

   postFormsAPI: (formName: string) => Promise<post_forms_resonse>

   putFormsAPI: (formName: string, formId: number) => Promise<string>

   deleteFormsAPI: (formId: number) => Promise<any>

   getQuestionsAPI: (
      formId: number,
      limit: number,
      offset: number
   ) => Promise<FormType>

   postQuestionsAPI: (
      formId: number,
      questions: { questions: object[] }
   ) => Promise<any>
}

export default FormService
