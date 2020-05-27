import React from 'react'
import {
   CreateCard,
   Title,
   ButtonContainer,
   AddButton
} from './styledComponents'

type CreateFormCardProps = {
   onCreateForm: () => void
}
class CreateFormCard extends React.Component<CreateFormCardProps> {
   render() {
      const { onCreateForm } = this.props
      return (
         <CreateCard>
            <Title>New Form</Title>
            <ButtonContainer>
               <AddButton onClick={onCreateForm}>+</AddButton>
            </ButtonContainer>
         </CreateCard>
      )
   }
}

export default CreateFormCard
