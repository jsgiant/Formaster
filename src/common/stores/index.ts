import { authStores } from '../../Authentication/stores'
import { adminStores } from '../../Admin/stores'
import { userStores } from '../../User/stores'
const stores = {
   ...authStores,
   ...adminStores,
   ...userStores
}

export { stores }
