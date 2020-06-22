import React, { Component } from 'react'
import { Btn, ButtonContainer } from './styledComponents'

type ButtonProps = {
   buttonText: string
   callback: () => void
}

class Button extends Component<ButtonProps> {
   render() {
      const { buttonText, callback } = this.props
      return (
         <ButtonContainer>
            <Btn onClick={callback}>{buttonText}</Btn>
         </ButtonContainer>
      )
   }
}

export default Button
