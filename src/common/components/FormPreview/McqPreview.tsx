import React, { PureComponent } from 'react'
import { observer } from 'mobx-react'
import {
   FieldTitle,
   FieldNumber,
   FieldDescription,
   ChoicesList,
   ChoiceContainer,
   ChoiceOption,
   ChoiceLabel
} from './styledComponents'

type McqPreviewProps = {
   question: any
}

@observer
class McqPreview extends PureComponent<McqPreviewProps> {
   renderChoices = () => {
      const { mcqChoices } = this.props.question
      return mcqChoices.map(choice => {
         return (
            <ChoiceContainer id='choices'>
               <ChoiceOption type='radio' name='choices' />
               <ChoiceLabel>{choice}</ChoiceLabel>
            </ChoiceContainer>
         )
      })
   }

   render() {
      const { question } = this.props
      return (
         <>
            <FieldTitle>
               <FieldNumber>{question.id}.</FieldNumber>
               {question.title}
            </FieldTitle>
            {question.hasDescription && (
               <FieldDescription>{question.description}</FieldDescription>
            )}
            <ChoicesList>{this.renderChoices()}</ChoicesList>
         </>
      )
   }
}

export default McqPreview
