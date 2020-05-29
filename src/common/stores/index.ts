import { authStores } from '../../Authentication/stores'
import { userStores } from '../../Admin/stores'
const stores = {
   ...authStores,
   ...userStores
}

export { stores }
