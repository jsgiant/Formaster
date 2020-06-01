import React, { Component } from 'react'
import strings from '../../i18n/strings.json'
import { observer } from 'mobx-react'
import { buttons } from '../../constants/Buttons'
import {
   FieldTitle,
   FieldNumber,
   Field,
   LongFieldResponse,
   FieldDescription
} from './styledComponents'
import Button from './Button'

type LongTextQuestionPreviewProps = {
   question: any
   onClickEnterKey: (e) => void
   navigateToNext: () => void
   questionNumber: number
}

@observer
class LongTextQuestionPreview extends Component<LongTextQuestionPreviewProps> {
   render() {
      const { description, hasDescription, title } = this.props.question
      const { onClickEnterKey, navigateToNext, questionNumber } = this.props
      return (
         <Field>
            <FieldTitle>
               <FieldNumber>{questionNumber}.</FieldNumber>
               {title || '...'}
            </FieldTitle>
            {hasDescription && (
               <FieldDescription>{description}</FieldDescription>
            )}
            <LongFieldResponse
               placeholder={strings.response_placeholder}
               onKeyDown={onClickEnterKey}
            />
            <Button buttonText={buttons.ok} callback={navigateToNext} />
         </Field>
      )
   }
}

export default LongTextQuestionPreview
