import React from 'react'
import AuthService from '../../services/AuthService'
import AuthStore from '../../stores/AuthStore'

describe('loginRoute tests', () => {
   let authAPI
   let authStore
   let username = 'test-user'
   let password = 'test-password'

   beforeEach(() => {
      authAPI = new AuthService()
      authStore = new AuthStore(authAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should do something', () => {})
})
