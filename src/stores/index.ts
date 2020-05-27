import { authStores } from '../Authentication/stores'
import { userStores } from '../User/stores'
const stores = {
   ...authStores,
   ...userStores
}

export { stores }
