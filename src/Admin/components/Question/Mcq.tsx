import React from 'react'
import { observer } from 'mobx-react'
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
   onAddOrRemoveChoice: (event) => void
   onChangeChoiceText: (event) => void
}

@observer
class McqQuestion extends React.Component<McqQuestionProps> {
   renderChoices = () => {
      const { choices, onChangeChoiceText, onAddOrRemoveChoice } = this.props
      return choices.map((choiceOption, index) => {
         const { choice } = choiceOption
         return (
            <ChoiceContainer key={index}>
               {choice !== '' && '-'}
               <Choice
                  defaultValue={choice}
                  tabIndex={index}
                  onChange={onChangeChoiceText}
                  onKeyDown={onAddOrRemoveChoice}
                  placeholder={strings.mcq_placeholder}
               />
            </ChoiceContainer>
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
