import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '@testing-library/react'
import formsData from './../../fixtures/forms-data.json'
import FormCard from '.'

describe('Formcard tests', () => {
   const formDetails = formsData.test_forms[0]
   it('should test the form name', () => {
      const { getByText } = render(<FormCard formDetails={formDetails} />)

      expect(getByText(formDetails.name)).toBeInTheDocument()
   })

   it('should test options menu on toggle', () => {
      const { getByText, getByTestId } = render(
         <FormCard formDetails={formDetails} />
      )

      act(() => {
         fireEvent.click(getByTestId('test-toggle'))
      })
      expect(getByText('Delete')).toBeInTheDocument()
   })
})
