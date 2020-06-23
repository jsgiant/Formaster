import React from 'react'
import { observer } from 'mobx-react'
import { FiCheck } from 'react-icons/fi'

import strings from './../../i18n/form-strings.json'
import { McqType } from '../../stores/models/QuestionModel/McqModel'

import {
   QuestionTextInput,
   McqIcon,
   Choice,
   ChoiceContainer
} from './styledComponents'

type McqQuestionProps = {
   onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void
   text: string
   choices: Array<McqType>
   onAddOrRemoveChoice: (event: any) => void
   onChangeChoiceText: (e: React.ChangeEvent<HTMLInputElement>) => void
}

@observer
class McqQuestion extends React.Component<McqQuestionProps> {
   renderChoices = (): React.ReactNode => {
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
