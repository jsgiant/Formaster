import React, { Component } from 'react'
import { observer } from 'mobx-react'
import strings from '../../i18n/strings.json'
import {
   FieldTitle,
   FieldNumber,
   FieldResponse,
   FieldDescription
} from './styledComponents'

type ShortTextQuestionPreviewProps = {
   question: any
}

@observer
class ShortTextQuestionPreview extends Component<
   ShortTextQuestionPreviewProps
> {
   render() {
      const { question } = this.props
      return (
         <>
            <FieldTitle>
               <FieldNumber>{question.id}.</FieldNumber>
               {question.title}
            </FieldTitle>
            {!question.hasDescription && (
               <FieldDescription>{question.description}</FieldDescription>
            )}
            <FieldResponse placeholder={strings.response_placeholder} />
         </>
      )
   }
}

export default ShortTextQuestionPreview
