import React, { Component } from 'react'
import { UserFormCardContainer, UserFormCardName } from './styledComponents'

type UserFormCardProps = {
   formName: string
   formId: number | undefined
   onClickForm: (formId: number) => void
}

class UserFormCard extends Component<UserFormCardProps> {
   render() {
      const { formName, onClickForm, formId } = this.props
      return (
         <UserFormCardContainer
            data-testid='test-card'
            onClick={() => {
               if (formId) {
                  onClickForm(formId)
               }
            }}
         >
            <UserFormCardName>{formName}</UserFormCardName>
         </UserFormCardContainer>
      )
   }
}

export default UserFormCard
