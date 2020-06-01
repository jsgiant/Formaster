import React, { Component } from 'react'
import { UserFormCardContainer, UserFormCardName } from './styledComponents'

type UserFormCardProps = {
   formName: string
   formId: number
   onClickForm: (formId) => void
}

class UserFormCard extends Component<UserFormCardProps> {
   render() {
      const { formName, onClickForm, formId } = this.props
      return (
         <UserFormCardContainer
            onClick={() => {
               onClickForm(formId)
            }}
         >
            <UserFormCardName>{formName}</UserFormCardName>
         </UserFormCardContainer>
      )
   }
}

export default UserFormCard
