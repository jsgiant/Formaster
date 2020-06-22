import Cookie from 'js-cookie'

import {
   API_INITIAL,
   API_FETCHING,
   API_FAILED,
   API_SUCCESS
} from '@ib/api-constants'

import AuthService from '../../services/AuthService/AuthFixture'
import { requestObject } from '../../services/AuthService/AuthAPI'
import AuthStore from '.'

describe('authStore tests', () => {
   let authAPI: AuthService
   let authStore: AuthStore

   beforeEach(() => {
      authAPI = new AuthService()
      authStore = new AuthStore(authAPI)
   })

   it('should test initialising auth store', () => {
      expect(authStore.getLoginAPIStatus).toBe(API_INITIAL)
      expect(authStore.getLoginAPIError).toBe(null)
   })

   it('should test loginAPI data fetching state', () => {
      const onSucccess: () => null = jest.fn()
      const onFailure: (error: string) => void = jest.fn()

      const requestObject: requestObject = {
         userName: 'test-user',
         password: 'test-password'
      }
      const mockLoadingPromise: Promise<{}> = new Promise(_ => {})
      const mockLoginAPI = jest.fn()
      mockLoginAPI.mockReturnValue(mockLoadingPromise)
      authAPI.getLoginAPI = mockLoginAPI

      authStore.userLogin(requestObject, onSucccess, onFailure)
      expect(authStore.getLoginAPIStatus).toBe(API_FETCHING)
      expect(onSucccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test LoginAPI data failure state', async () => {
      const onSucccess: () => null = jest.fn()
      const onFailure: (error: string) => void = jest.fn()
      const requestObject: requestObject = {
         userName: 'test-user',
         password: 'test-password'
      }

      const mockFailurePromise: Promise<{}> = new Promise((_, reject) => {
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
      const onSucccess: () => null = jest.fn()
      const onFailure: (error: string) => void = jest.fn()

      const requestObject: requestObject = {
         userName: 'test-user',
         password: 'test-password'
      }

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
