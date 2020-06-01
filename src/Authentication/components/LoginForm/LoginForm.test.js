import React from 'react'
import { render } from '@testing-library/react'
import strings from '../../i18n/strings.json'
import LoginForm from '.'

describe('LoginForm', () => {
   it('should render given username', () => {
      const userName = 'test-username'
      const mockFn = jest.fn()
      const { getByPlaceholderText } = render(
         <LoginForm userName={userName} onChangeUserName={mockFn} />
      )

      const usernameField = getByPlaceholderText(
         strings.login.usernamePlaceholder
      )
      expect(usernameField.value).toBe(userName)
   })

   it('should render given password', () => {
      const password = 'test-password'
      const mockFn = jest.fn()
      const { getByPlaceholderText } = render(
         <LoginForm password={password} onChangePassword={mockFn} />
      )

      const passwordField = getByPlaceholderText(
         strings.login.passwordPlaceholder
      )
      expect(passwordField.value).toBe(password)
   })

   it('should render given username error message', () => {
      const { getByText } = render(<LoginForm errorMessage='error' />)
      expect(getByText(/error/)).toBeInTheDocument()
   })

   it('should contain login button', () => {
      const button = 'login-btn'

      const { getByTestId } = render(<LoginForm />)

      expect(getByTestId(button)).toBeInTheDocument()
   })
})
