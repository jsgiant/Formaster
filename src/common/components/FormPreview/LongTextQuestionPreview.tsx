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
   isFinalQuestion: boolean
   onSubmit: () => void
}

@observer
class LongTextQuestionPreview extends Component<LongTextQuestionPreviewProps> {
   onChangeResponse = e => {
      const { onChangeResponse } = this.props.question
      onChangeResponse(e.target.value)
   }
   render() {
      const {
         description,
         position,
         questionTitle,
         response
      } = this.props.question
      const {
         onClickEnterKey,
         navigateToNext,
         questionNumber,
         isFinalQuestion,
         onSubmit
      } = this.props
      return (
         <Field>
            <FieldTitle>
               <FieldNumber>{position ? `${position} .` : '🡢'}</FieldNumber>
               {questionTitle || strings.emptyTitle}
            </FieldTitle>
            <FieldDescription>{description}</FieldDescription>
            <LongFieldResponse
               placeholder={strings.response_placeholder}
               onKeyDown={onClickEnterKey}
               value={response}
               onChange={this.onChangeResponse}
            />
            {response && (
               <Button
                  buttonText={isFinalQuestion ? buttons.submit : buttons.ok}
                  callback={isFinalQuestion ? onSubmit : navigateToNext}
               />
            )}
         </Field>
      )
   }
}

export default LongTextQuestionPreview
