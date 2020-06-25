import { UserFormsResponse, Form } from '../stores/types'

export interface UserFormService {
   getUserFormsAPI: () => Promise<UserFormsResponse>

   getQuestionsAPI: (formId: number) => Promise<Form>

   postResponsesAPI: (formId: number, resonses: any) => Promise<string>
}
