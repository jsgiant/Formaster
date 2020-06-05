import Cookie from 'js-cookie'

export const ACCESS_TOKEN = 'access_token'
export const IS_ADMIN = 'is_admin'

export function getCookie(key) {
   return Cookie.get(key)
}

function setCookie(key, value) {
   Cookie.set(key, value, {
      expires: 30,
      path: '/'
   })
}

export function getAccessToken() {
   return getCookie(ACCESS_TOKEN)
}
export function setAccessToken(accessToken) {
   setCookie(ACCESS_TOKEN, accessToken)
}

export function isAdmin() {
   return getCookie(IS_ADMIN)
}

export function setIsAdmin(isAdmin) {
   console.log(typeof isAdmin)
   setCookie(IS_ADMIN, isAdmin)
}

export function clearUserSession() {
   Cookie.remove(ACCESS_TOKEN, { path: '/' })
   Cookie.remove(IS_ADMIN, { path: '/' })
}
