import React, { Component } from 'react'
import { observer } from 'mobx-react'

import strings from '../../i18n/strings.json'
import { buttons } from '../../constants/Buttons'
import {
   EndCardText,
   FieldDescription,
   EndCardPreviewWrapper
} from './styledComponents'
import Button from './Button'

type EndCardsPreviewProps = {
   question: any
   navigateToNext: () => void
}

@observer
class EndCardsPreview extends Component<EndCardsPreviewProps> {
   renderButton = () => {
      const { type } = this.props.question
      const { navigateToNext } = this.props
      return type === strings.welcome_screen ? (
         <Button buttonText={buttons.start} callback={navigateToNext} />
      ) : null
   }
   render() {
      const { title, description, hasDescription } = this.props.question
      return (
         <EndCardPreviewWrapper>
            <EndCardText>{title || '...'}</EndCardText>
            {hasDescription && (
               <FieldDescription>
                  <span>{description}</span>
               </FieldDescription>
            )}
            {this.renderButton()}
         </EndCardPreviewWrapper>
      )
   }
}

export default EndCardsPreview
