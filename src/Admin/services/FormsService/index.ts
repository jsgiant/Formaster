import { formsResponse } from '../../stores/types'

interface FormService {
   getFormsAPI: (
      limit: number,
      offset: number
   ) => Promise<formsResponse>
}
