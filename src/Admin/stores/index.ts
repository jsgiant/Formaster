import FormStore from './FormStore'
// import FormsAPI from '../services/FormsService/FormsAPI'
import FormsAPI from '../services/FormsService/FormsFixture'

const formAPI = new FormsAPI()

const formStore = new FormStore(formAPI)

export const adminStores = {
   formStore
}
