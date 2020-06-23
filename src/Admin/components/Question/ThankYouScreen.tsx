import React from 'react'
import { MdViewArray } from 'react-icons/md'
import strings from './../../i18n/form-strings.json'
import { QuestionTextInput, ThankyouIcon } from './styledComponents'

type ThankyouScreenProps = {
   onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void
   text: string
}

class ThankyouScreen extends React.Component<ThankyouScreenProps> {
   render() {
      const { onChangeText, text } = this.props
      return (
         <>
            <ThankyouIcon>
               <MdViewArray />A
            </ThankyouIcon>
            <QuestionTextInput
               placeholder={strings.thankyou_placeholder}
               onChange={onChangeText}
               defaultValue={text}
            />
         </>
      )
   }
}

export default ThankyouScreen
