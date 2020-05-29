// import PostFormsAPI from '../services/PostFormService/PostFormsAPI'
// import PutFormsAPI from '../services/PutFormService/PutFormsAPI'
// import DeleteFormsAPI from '../services/DeleteFormService/DeleteFormAPI'

// import GetFormsAPI from '../services/GetFormsService/GetFormsFixture'
// import PostFormsAPI from '../services/PostFormService/PostFormsFixture'
import FormStore from './FormStore'
import FormsAPI from '../services/FormsService/FormsFixture'
// import PutFormsAPI from '../services/PutFormService/PutFormsFixture'
// import DeleteFormsAPI from '../services/DeleteFormService/DeleteFormFixture'

const formsAPI = new FormsAPI()

const formStore = new FormStore(formsAPI)

export const userStores = {
   formStore
}

// fixtures vs APIs
