import React from 'react'
import { MdViewCarousel } from 'react-icons/md'
import strings from './../../i18n/form-strings.json'
import { QuestionTextInput, WelcomeIcon } from './styledComponents'

type WelcomeScreenProps = {
   onChangeText: (name) => void
   text: string
}

class WelcomeScreen extends React.Component<WelcomeScreenProps> {
   render() {
      const { onChangeText, text } = this.props
      return (
         <>
            <WelcomeIcon>
               <MdViewCarousel />
            </WelcomeIcon>
            <QuestionTextInput
               placeholder={strings.welcome_placeholder}
               onChange={onChangeText}
               defaultValue={text}
            />
         </>
      )
   }
}

export default WelcomeScreen
