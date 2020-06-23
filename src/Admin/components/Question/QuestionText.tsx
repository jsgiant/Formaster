import React from 'react'
import { QuestionTextInput } from './styledComponents'
type QuestionTextProps = {
   placeholder: string
   onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void
   text: string
}

class QuestionText extends React.Component<QuestionTextProps> {
   render() {
      const { placeholder, onChangeText, text } = this.props
      return (
         <QuestionTextInput
            onChange={onChangeText}
            defaultValue={text}
            placeholder={placeholder}
         />
      )
   }
}

export default QuestionText
