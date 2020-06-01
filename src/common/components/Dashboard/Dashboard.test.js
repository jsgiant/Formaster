import React from 'react'
import { render } from '@testing-library/react'
import formsData from '../../../Admin/fixtures/forms-data.json'
import Dashboard from '.'

describe('dashboard tests', () => {
   it('should contain logout button', () => {
      const { getByTestId } = render(<Dashboard formsList={formsData.forms} />)
      expect(getByTestId('logout-btn')).toBeInTheDocument()
   })
})
