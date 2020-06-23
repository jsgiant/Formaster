import React from 'react'
import { MdReorder } from 'react-icons/md'
import strings from './../../i18n/form-strings.json'
import { QuestionTextInput, LargeTextIcon } from './styledComponents'

type LargeTextProps = {
   onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void
   text: string
}
class LargeText extends React.Component<LargeTextProps> {
   render() {
      const { onChangeText, text } = this.props
      return (
         <>
            <LargeTextIcon>
               <MdReorder />
            </LargeTextIcon>
            <QuestionTextInput
               placeholder={strings.question_placeholder}
               onChange={onChangeText}
               defaultValue={text}
            />
         </>
      )
   }
}

export default LargeText
