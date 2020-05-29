import React from 'react'
import { FiCheck } from 'react-icons/fi'
import strings from './../../i18n/form-strings.json'
import {
   QuestionTextInput,
   McqIcon,
   Choice,
   ChoiceContainer
} from './styledComponents'

type McqQuestionProps = {
   onChangeText: (name) => void
   text: string
   choices: Array<any>
   onAddNewChoice: () => void
   onChangeChoiceText: (event) => void
}

class McqQuestion extends React.Component<McqQuestionProps> {
   renderChoices = () => {
      const { choices, onChangeChoiceText } = this.props
      return choices.map((choice, index) => {
         return (
            <>
               <ChoiceContainer>
                  -
                  <Choice
                     key={index}
                     defaultValue={choice.title}
                     tabIndex={index}
                     onChange={onChangeChoiceText}
                     placeholder={strings.mcq_placeholder}
                  />
               </ChoiceContainer>
            </>
         )
      })
   }
   render() {
      const { onChangeText, text } = this.props

      return (
         <>
            <McqIcon>
               <FiCheck />
            </McqIcon>
            <QuestionTextInput
               placeholder={strings.question_placeholder}
               onChange={onChangeText}
               defaultValue={text}
            />
            {this.renderChoices()}
         </>
      )
   }
}

export default McqQuestion

// delete choice
//  remove -
