import React from 'react'
import { MdShortText } from 'react-icons/md'
import strings from './../../i18n/form-strings.json'
import { QuestionTextInput, ShortTextIcon } from './styledComponents'

type ShortTextProps = {
   onChangeText: (name) => void
   text: string
}
class ShortText extends React.Component<ShortTextProps> {
   render() {
      const { onChangeText, text } = this.props
      return (
         <>
            <ShortTextIcon>
               <MdShortText />
            </ShortTextIcon>
            <QuestionTextInput
               placeholder={strings.question_placeholder}
               onChange={onChangeText}
               defaultValue={text}
            />
         </>
      )
   }
}

export default ShortText
