import React, { PureComponent } from 'react'
import { observer } from 'mobx-react'
import { buttons } from '../../constants/Buttons'
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
import Button from './Button'

type McqPreviewProps = {
   question: any
   questionNumber: number
   navigateToNext: () => void
   isFinalQuestion: boolean
   onSubmit: () => void
}

@observer
class McqPreview extends PureComponent<McqPreviewProps> {
   onChangeChoice = e => {
      const { onChangeresponseId } = this.props.question
      const { navigateToNext } = this.props
      onChangeresponseId(e.target.value)
      navigateToNext()
   }

   renderChoices = () => {
      const { mcqChoices, responseId } = this.props.question
      return mcqChoices.map((choiceOption, index) => {
         const { choice_id, choice } = choiceOption
         return (
            <ChoiceContainer key={index} id='choices'>
               <ChoiceOption
                  type='radio'
                  name='choices'
                  value={choice_id}
                  onClick={this.onChangeChoice}
                  defaultChecked={responseId === choice_id}
               />
               <ChoiceLabel>{choice || `choice ${index + 1}`}</ChoiceLabel>
            </ChoiceContainer>
         )
      })
   }

   render() {
      const { id, title, hasDescription, description } = this.props.question
      const { questionNumber, onSubmit, isFinalQuestion } = this.props
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
            {isFinalQuestion && (
               <Button buttonText={buttons.submit} callback={onSubmit} />
            )}
         </Field>
      )
   }
}

export default McqPreview
