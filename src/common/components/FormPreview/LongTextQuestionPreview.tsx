import React, { Component } from 'react'
import strings from '../../i18n/strings.json'
import { observer } from 'mobx-react'
import {
   FieldTitle,
   FieldNumber,
   LongFieldResponse,
   FieldDescription
} from './styledComponents'

type LongTextQuestionPreviewProps = {
   question: any
}

@observer
class LongTextQuestionPreview extends Component<LongTextQuestionPreviewProps> {
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
            <LongFieldResponse placeholder={strings.response_placeholder} />
         </>
      )
   }
}

export default LongTextQuestionPreview
