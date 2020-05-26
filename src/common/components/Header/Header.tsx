import React from 'react'
import {
   HeaderDiv,
   TitleDiv,
   HeaderLeftSection,
   LogoutButton
} from './styledComponents'

type HeaderProps = {
   onLogoutClick: () => void
}

class Header extends React.Component<HeaderProps> {
   render() {
      const { onLogoutClick } = this.props
      return (
         <HeaderDiv>
            <TitleDiv>
               <a href='/'>Formaster</a>
            </TitleDiv>
            <HeaderLeftSection>
               <LogoutButton onClick={onLogoutClick}>Logout</LogoutButton>
            </HeaderLeftSection>
         </HeaderDiv>
      )
   }
}

export default Header
