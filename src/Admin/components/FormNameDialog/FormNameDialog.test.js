import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import strings from '../../i18n/strings.json'
import FormNameDialog from '.'

describe('FormNameDialog tests', () => {
   it('should render given name', () => {
      const { getByPlaceholderText } = render(<FormNameDialog />)
      const name = 'test-form'
      const renameField = getByPlaceholderText(strings.popup.namePlaceholder)
      fireEvent.change(renameField, { target: { value: name } })

      expect(renameField.value).toBe(name)
   })
   it('should test on click continue button', () => {
      const mockContinue = jest.fn()
      const { getByRole, getByPlaceholderText } = render(
         <FormNameDialog onClickContinue={mockContinue} />
      )
      const name = 'test-form'
      const renameField = getByPlaceholderText(strings.popup.namePlaceholder)
      fireEvent.change(renameField, { target: { value: name } })

      fireEvent.click(getByRole('button', ('button', { name: 'Continue' })))

      expect(mockContinue).toBeCalled()
   })
})
