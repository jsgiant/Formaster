import React from 'react'
import {
   CreateCard,
   Title,
   ButtonContainer,
   AddButton
} from './styledComponents'

class CreateFormCard extends React.Component {
   render() {
      return (
         <CreateCard>
            <Title>New Form</Title>
            <ButtonContainer>
               <AddButton>+</AddButton>
            </ButtonContainer>
         </CreateCard>
      )
   }
}

export default CreateFormCard
