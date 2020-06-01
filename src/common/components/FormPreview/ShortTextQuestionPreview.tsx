import React, { Component } from 'react'
import { observer } from 'mobx-react'

import strings from '../../i18n/strings.json'
import { buttons } from '../../constants/Buttons'

import {
   FieldTitle,
   FieldNumber,
   FieldResponse,
   FieldDescription,
   Field
} from './styledComponents'
import Button from './Button'

type ShortTextQuestionPreviewProps = {
   question: any
   onClickEnterKey: (e) => void
   navigateToNext: () => void
   questionNumber: number
}

@observer
class ShortTextQuestionPreview extends Component<
   ShortTextQuestionPreviewProps
> {
   render() {
      const {
         description,
         hasDescription,
         title,
         response
      } = this.props.question
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
            <FieldResponse
               placeholder={strings.response_placeholder}
               onKeyDown={onClickEnterKey}
            />
            <Button buttonText={buttons.ok} callback={navigateToNext} />
         </Field>
      )
   }
}

export default ShortTextQuestionPreview
