export interface FormType {
   form_id?: number | undefined
   form_name: string
   questions?: Array<object>
}

export interface formsResponse {
   total: number
   forms: Array<FormType>
   test_forms: Array<object>
}

export interface post_forms_resonse {
   form_id: number
   form_name: string
}
