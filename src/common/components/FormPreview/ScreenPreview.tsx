import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { ScreenText, FieldDescription } from './styledComponents'

type ScreenPreviewProps = {
   question: any
}

@observer
class ScreenPreview extends Component<ScreenPreviewProps> {
   render() {
      const { question } = this.props
      return (
         <>
            <ScreenText>{question.title}</ScreenText>
            {question.hasDescription && (
               <FieldDescription>
                  dsfsdfs{question.description}
               </FieldDescription>
            )}
         </>
      )
   }
}

export default ScreenPreview
