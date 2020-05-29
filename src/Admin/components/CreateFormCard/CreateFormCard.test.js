import React from 'react'
import { render } from '@testing-library/react'
import strings from './../../i18n/strings.json'
import CreateFormCard from './CreateFormCard'

describe('Create form card tests', () => {
   it('should contain the title', () => {
      const { getByText } = render(<CreateFormCard />)
      expect(getByText(strings.formcard.create_card_title)).toBeInTheDocument()
   })

   it('should contain an add button', () => {
      const { getByRole } = render(<CreateFormCard />)
      expect(getByRole('button', { name: '+' })).toBeInTheDocument()
   })
})
