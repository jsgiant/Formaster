import React from 'react'

import Logo from '../../Logo'

import {
   HeaderDiv,
   TitleDiv,
   HeaderRightSection,
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
            <Logo />
            <HeaderRightSection>
               <LogoutButton data-testid='logout-btn' onClick={onLogoutClick}>
                  Logout
               </LogoutButton>
            </HeaderRightSection>
         </HeaderDiv>
      )
   }
}

export default Header
