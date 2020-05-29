import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import formsData from './../../fixtures/forms-data.json'
import FormCard from '.'

describe('Formcard tests', () => {
   const formDetails = formsData.forms[0]
   it('should test the form name', () => {
      const { getByText } = render(<FormCard formDetails={formDetails} />)

      expect(getByText(formDetails.name)).toBeInTheDocument()
   })

   it('should test options menu on toggle', () => {
      const { getByText, getByTestId } = render(
         <FormCard formDetails={formDetails} />
      )
      fireEvent.click(getByTestId('test-toggle'))
      expect(getByText('Delete')).toBeInTheDocument()
   })

   it('should test rename popover on clicking rename', () => {
      const { getByText, getByTestId, getByRole } = render(
         <FormCard formDetails={formDetails} />
      )
      fireEvent.click(getByTestId('test-toggle'))
      fireEvent.click(getByText('Rename'))

      expect(getByRole('button', { name: 'Continue' })).toBeInTheDocument()
   })
})
