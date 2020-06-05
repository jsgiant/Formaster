import React, { Component } from 'react'
import { observer } from 'mobx-react'

import strings from '../../i18n/strings.json'
import { buttons } from '../../constants/Buttons'
import {
   EndCardText,
   EndCardDescription,
   EndCardPreviewWrapper
} from './styledComponents'
import Button from './Button'

type EndCardsPreviewProps = {
   question: any
   navigateToNext: () => void
   onSubmit: () => void
}

@observer
class EndCardsPreview extends Component<EndCardsPreviewProps> {
   renderButton = () => {
      const { type } = this.props.question
      const { navigateToNext, onSubmit } = this.props
      return type === strings.welcome_screen ? (
         <Button buttonText={buttons.start} callback={navigateToNext} />
      ) : (
         <Button buttonText={buttons.submit} callback={onSubmit} />
      )
   }

   render() {
      const { questionTitle, description } = this.props.question
      return (
         <EndCardPreviewWrapper>
            <EndCardText>{questionTitle || strings.emptyTitle}</EndCardText>

            <EndCardDescription>{description}</EndCardDescription>

            {this.renderButton()}
         </EndCardPreviewWrapper>
      )
   }
}

export default EndCardsPreview
