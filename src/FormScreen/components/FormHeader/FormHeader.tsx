import React from 'react'
import {
   HeaderContainer,
   FormTitle,
   HeaderLeftSection,
   GoBack,
   LogoutButton,
   HeaderRightSection
} from './styledComponents'

type FormHeaderProps = {
   name: string
   onClickLogout: () => void
   onClickPublish: () => void
   onClickPreview: () => void
   onNavigateBack: () => void
}
class FormHeader extends React.Component<FormHeaderProps> {
   render() {
      const { name, onClickLogout, onNavigateBack } = this.props
      return (
         <HeaderContainer>
            <HeaderLeftSection>
               <GoBack onClick={onNavigateBack}>&larr;</GoBack>
               <FormTitle>{name}</FormTitle>
            </HeaderLeftSection>
            <HeaderRightSection>
               <LogoutButton onClick={onClickLogout} data-testid='logout-btn'>
                  Logout
               </LogoutButton>
            </HeaderRightSection>
         </HeaderContainer>
      )
   }
}

export { FormHeader }
