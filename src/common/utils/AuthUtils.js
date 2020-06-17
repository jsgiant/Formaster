import { getAccessToken } from './StorageUtils'

export const isLoggedIn = () => {
   return getAccessToken() !== undefined && getAccessToken() !== ''
}
