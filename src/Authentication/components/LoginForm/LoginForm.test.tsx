import React from 'react'
import { render } from '@testing-library/react'
import { API_INITIAL } from '@ib/api-constants'
import strings from '../../i18n/strings.json'
import LoginForm from '.'

describe('LoginForm', () => {
   const userName: string = 'test-username'
   const password: string = 'test-password'
   it('should render given username', () => {
      const mockFn = jest.fn()
      const { getByPlaceholderText } = render(
         <LoginForm
            userName={userName}
            password={password}
            errorMessage=''
            apiStatus={API_INITIAL}
            onClickLogin={mockFn}
            onChangeUserName={mockFn}
            onChangePassword={mockFn}
         />
      )

      //Fix this type of this field
      const userNameField: any = getByPlaceholderText(
         strings.login.usernamePlaceholder
      )
      expect(userNameField.value).toBe(userName)
   })

   it('should render given password', () => {
      const mockFn = jest.fn()
      const { getByPlaceholderText } = render(
         <LoginForm
            userName={userName}
            password={password}
            errorMessage=''
            apiStatus={API_INITIAL}
            onClickLogin={mockFn}
            onChangeUserName={mockFn}
            onChangePassword={mockFn}
         />
      )

      //Fix this type of this field
      const passwordField: any = getByPlaceholderText(
         strings.login.passwordPlaceholder
      )
      expect(passwordField.value).toBe(password)
   })

   const mockFn = jest.fn()
   it('should render given username error message', () => {
      const mockFn = jest.fn()
      const { getByText } = render(
         <LoginForm
            userName={userName}
            password={password}
            errorMessage='error'
            apiStatus={API_INITIAL}
            onClickLogin={mockFn}
            onChangeUserName={mockFn}
            onChangePassword={mockFn}
         />
      )
      expect(getByText(/error/)).toBeInTheDocument()
   })

   it('should contain login button', () => {
      const button = 'login-btn'

      const { getByTestId } = render(
         <LoginForm
            userName={userName}
            password={password}
            errorMessage=''
            apiStatus={API_INITIAL}
            onClickLogin={mockFn}
            onChangeUserName={mockFn}
            onChangePassword={mockFn}
         />
      )

      expect(getByTestId(button)).toBeInTheDocument()
   })
})
