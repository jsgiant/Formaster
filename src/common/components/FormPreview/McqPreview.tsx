import React, { PureComponent } from 'react'
import { observer } from 'mobx-react'
import {
   FieldTitle,
   FieldNumber,
   FieldDescription,
   ChoicesList,
   ChoiceContainer,
   ChoiceOption,
   ChoiceLabel,
   Field
} from './styledComponents'

type McqPreviewProps = {
   question: any
   questionNumber: number
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
      const { id, title, hasDescription, description } = this.props.question
      const { questionNumber } = this.props
      return (
         <Field>
            <FieldTitle>
               <FieldNumber>{questionNumber}.</FieldNumber>
               {title || '...'}
            </FieldTitle>
            {hasDescription && (
               <FieldDescription>{description}</FieldDescription>
            )}
            <ChoicesList>{this.renderChoices()}</ChoicesList>
         </Field>
      )
   }
}

export default McqPreview
