import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '@testing-library/react'

import formsData from '../../fixtures/forms-data.json'
import FormModel from '../../stores/models/FormModel'
import FormsAPI from '../../services/FormsService/FormsFixture'
import QuestionStore from '../../stores/QuestionStore'

import FormCard from '.'

describe('Formcard tests', () => {
   const formDetails = formsData.test_forms[0]
   let formModel: FormModel
   let formsAPI: FormsAPI
   let questionStore: QuestionStore

   beforeEach(() => {
      formsAPI = new FormsAPI()
      questionStore = new QuestionStore([])
      formModel = new FormModel(formDetails, formsAPI, questionStore)
   })
   it('should test the form name', () => {
      const mockFn = jest.fn()
      const { getByText } = render(
         <FormCard
            formDetails={formModel}
            onClickForm={mockFn}
            onDeleteForm={mockFn}
            isProcessing={false}
         />
      )

      expect(getByText(formDetails.form_name)).toBeInTheDocument()
   })

   it('should test options menu on toggle', () => {
      const mockFn = jest.fn()
      const { getByText, getByTestId } = render(
         <FormCard
            formDetails={formModel}
            onClickForm={mockFn}
            onDeleteForm={mockFn}
            isProcessing={false}
         />
      )

      act(() => {
         fireEvent.click(getByTestId('test-toggle'))
      })
      expect(getByText('Delete')).toBeInTheDocument()
   })
})
