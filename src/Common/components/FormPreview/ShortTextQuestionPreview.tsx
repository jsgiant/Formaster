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
   isFinalQuestion: boolean
   onSubmit: () => void
}

@observer
class ShortTextQuestionPreview extends Component<
   ShortTextQuestionPreviewProps
> {
   onChangeResponse = e => {
      const { onChangeResponse } = this.props.question
      onChangeResponse(e.target.value)
   }
   render() {
      const {
         description,
         hasDescription,
         questionTitle,
         response,
         isRequired,
         position
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
               {position ? `${position}. ` : '🡢'}
               {questionTitle || strings.emptyTitle}
               {isRequired && '*'}
            </FieldTitle>

            <FieldDescription>{description}</FieldDescription>

            <FieldResponse
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

export default ShortTextQuestionPreview
