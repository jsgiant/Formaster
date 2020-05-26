import React from 'react'
import {
   HeaderDiv,
   TitleDiv,
   HeaderLeftSection,
   LogoutButton
} from './styledComponents'

class Header extends React.Component {
   render() {
      return (
         <HeaderDiv>
            <TitleDiv>
               <a href='/'>Formaster</a>
            </TitleDiv>
            <HeaderLeftSection>
               <LogoutButton>Logout</LogoutButton>
            </HeaderLeftSection>
         </HeaderDiv>
      )
   }
}

export default Header
