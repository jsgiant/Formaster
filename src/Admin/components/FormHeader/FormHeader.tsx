import React from 'react'
import {
   HeaderContainer,
   FormTitle,
   HeaderLeftSection,
   GoBack,
   LogoutButton,
   HeaderRightSection,
   PublishButton
} from './styledComponents'

type FormHeaderProps = {
   name: string
   onClickLogout: () => void
   onClickPublish: () => void
   onClickPreview: () => void
   onNavigateBack: () => void
   isPublishing: boolean
}
class FormHeader extends React.Component<FormHeaderProps> {
   render() {
      const {
         name,
         onClickLogout,
         onNavigateBack,
         onClickPublish,
         isPublishing
      } = this.props
      return (
         <HeaderContainer>
            <HeaderLeftSection>
               <GoBack data-testid='test-back' onClick={onNavigateBack}>
                  &larr;
               </GoBack>
               <FormTitle>{name}</FormTitle>
            </HeaderLeftSection>
            <HeaderRightSection>
               <PublishButton
                  disabled={isPublishing}
                  isDisabled={isPublishing}
                  onClick={onClickPublish}
               >
                  Publish
               </PublishButton>
               <LogoutButton onClick={onClickLogout} data-testid='logout-btn'>
                  Logout
               </LogoutButton>
            </HeaderRightSection>
         </HeaderContainer>
      )
   }
}

export { FormHeader }
