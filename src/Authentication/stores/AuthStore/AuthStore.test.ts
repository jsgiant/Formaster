import Cookie from 'js-cookie'
import AuthService from '../../services/AuthService'
import getLoginAPIResponse from '../../fixtures/login-api-response.json'
import AuthStore from '.'

import {
   API_INITIAL,
   API_FETCHING,
   API_FAILED,
   API_SUCCESS
} from '@ib/api-constants'

describe('authStore tests', () => {
   let authAPI
   let authStore

   beforeEach(() => {
      authAPI = new AuthService()
      authStore = new AuthStore(authAPI)
   })

   it('should test initialising auth store', () => {
      expect(authStore.getLoginAPIStatus).toBe(API_INITIAL)
      expect(authStore.getLoginAPIError).toBe(null)
   })

   it('should test loginAPI data fetching state', () => {
      const onSucccess = jest.fn()
      const onFailure = jest.fn()

      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockLoginAPI = jest.fn()
      mockLoginAPI.mockReturnValue(mockLoadingPromise)
      authAPI.getLoginAPI = mockLoginAPI

      authStore.userLogin(requestObject, onSucccess, onFailure)
      expect(authStore.getLoginAPIStatus).toBe(API_FETCHING)
      expect(onSucccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test LoginAPI data failure state', async () => {
      const onSucccess = jest.fn()
      const onFailure = jest.fn()
      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }

      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      })

      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockFailurePromise)
      authAPI.getLoginAPI = mockSignInAPI

      await authStore.userLogin(requestObject, onSucccess, onFailure)
      expect(authStore.getLoginAPIStatus).toBe(API_FAILED)
      expect(authStore.getLoginAPIError).toBe('error')
      expect(onFailure).toBeCalled()
   })

   it('should test userLoginAPI data success state', async () => {
      const onSucccess = jest.fn()
      const onFailure = jest.fn()

      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getLoginAPIResponse)
      })
      const mockLoginAPI = jest.fn()
      mockLoginAPI.mockReturnValue(mockSuccessPromise)
      authAPI.getLoginAPI = mockLoginAPI

      const mockSetCookie = jest.fn()
      Cookie.set = mockSetCookie

      await authStore.userLogin(requestObject, onSucccess, onFailure)
      expect(authStore.getLoginAPIStatus).toBe(API_SUCCESS)
      expect(mockSetCookie).toBeCalled()
      expect(onSucccess).toBeCalled()
   })

   it('should test store clear state after signout', () => {
      const mockRemoveCookie = jest.fn()
      Cookie.remove = mockRemoveCookie

      authStore.onSignOut()
      expect(mockRemoveCookie).toBeCalled()
      expect(authStore.getLoginAPIStatus).toBe(API_INITIAL)
      expect(authStore.getLoginAPIError).toBe(null)
   })
})
