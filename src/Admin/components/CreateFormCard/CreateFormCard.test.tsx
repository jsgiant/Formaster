import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import strings from '../../i18n/strings.json'

import CreateFormCard from './CreateFormCard'

describe('Create form card tests', () => {
   it('should contain the title', () => {
      const mockFn = jest.fn()
      const { getByText } = render(<CreateFormCard onCreateForm={mockFn} />)
      expect(getByText(strings.formcard.create_card_title)).toBeInTheDocument()
   })

   it('should contain an add button', () => {
      const mockFn = jest.fn()
      const { getByRole } = render(<CreateFormCard onCreateForm={mockFn} />)
      expect(getByRole('button', { name: '+' })).toBeInTheDocument()
   })
   it('should test add button', () => {
      const mockFn = jest.fn()
      const { getByRole } = render(<CreateFormCard onCreateForm={mockFn} />)
      expect(getByRole('button', { name: '+' })).toBeInTheDocument()
      fireEvent.click(getByRole('button', { name: '+' }))
      expect(mockFn).toBeCalled()
   })
})
