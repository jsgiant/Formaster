import GetFormsAPI from '../services/FormsService/GetFormsAPI'
import FormStore from './FormStore'

const formAPI = new GetFormsAPI()
const formStore = new FormStore(formAPI)

export const userStores = {
   formStore
}
