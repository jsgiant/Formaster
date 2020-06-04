import UserFormsAPI from '../services/UserFormsAPI'
// import UserFormsAPI from '../services/UserFormsFixture'
import UserFormStore from './UserFormStore'

const userFormsAPI = new UserFormsAPI()
const userFormStore = new UserFormStore(userFormsAPI)

export const userStores = {
   userFormStore
}
