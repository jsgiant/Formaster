import * as React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { Input } from './styledComponents'

interface ValidationResult {
   errorMessage: string
   shouldShowError: boolean
}

export interface ITextInputProps {
   validate: (input: string) => ValidationResult
}

@observer
export default class TextInput extends React.Component<ITextInputProps> {
   @observable userInput: string = ''
   @observable errorMessage: string = ''
   @observable shouldShowError: boolean = false

   @action.bound
   onChangeUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.userInput = e.target.value
   }

   @action.bound
   onBlurInput() {
      const { validate } = this.props
      const { errorMessage, shouldShowError } = validate(this.userInput)
      this.errorMessage = errorMessage
      this.shouldShowError = shouldShowError
   }

   render() {
      return (
         <Input
            value={this.userInput}
            onChange={this.onChangeUserInput}
            onBlur={this.onBlurInput}
            placeholder='Enter here...'
         />
      )
   }
}
