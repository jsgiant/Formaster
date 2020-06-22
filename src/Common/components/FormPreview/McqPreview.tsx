import React, { PureComponent } from 'react'
import { observer } from 'mobx-react'
import strings from '../../i18n/strings.json'
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
   onChangeChoice = choiceId => {
      const { onChangeresponseId } = this.props.question
      const { navigateToNext } = this.props
      onChangeresponseId(choiceId)
      navigateToNext()
   }

   isChecked = (id, choice_id) => {
      if (choice_id !== null && choice_id !== undefined) {
         return id === choice_id
      }
      return false
   }

   renderChoices = () => {
      const { mcqChoices, responseId } = this.props.question
      return mcqChoices.map((choiceOption, index) => {
         const { choice_id, choice } = choiceOption
         const isChecked = this.isChecked(choice_id, responseId)
         return (
            <ChoiceContainer key={index} id='choices'>
               <ChoiceOption
                  type='checkbox'
                  name='choices'
                  onChange={() => this.onChangeChoice(choice_id)}
                  checked={isChecked}
               />
               <ChoiceLabel>{choice || `choice ${index + 1}`}</ChoiceLabel>
            </ChoiceContainer>
         )
      })
   }

   render() {
      const {
         questionId,
         questionTitle,
         position,
         responseId,
         isRequired,
         description
      } = this.props.question
      const { onSubmit, isFinalQuestion } = this.props
      return (
         <Field>
            <FieldTitle>
               {position ? `${position}. ` : '🡢'}
               {questionTitle || strings.emptyTitle}
               {isRequired && '*'}
            </FieldTitle>

            <FieldDescription>{description}</FieldDescription>

            <ChoicesList>{this.renderChoices()}</ChoicesList>
            {isFinalQuestion && (
               <Button buttonText={buttons.submit} callback={onSubmit} />
            )}
         </Field>
      )
   }
}

export default McqPreview
