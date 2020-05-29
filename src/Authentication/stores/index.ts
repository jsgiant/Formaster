import AuthService from '../services/AuthService/AuthFixture'
import AuthStore from './AuthStore'

const authService = new AuthService()
const authStore = new AuthStore(authService)

export const authStores = {
   authStore
}
