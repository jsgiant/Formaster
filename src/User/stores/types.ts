export interface Form {
   form_id?: number | undefined
   form_name: string
   questions?: Array<object>
}

export type UserFormsResponse = {
   total: number
   forms: Array<Form>
}
export interface PostformsResonse {
   form_id: number
   form_name: string
}
