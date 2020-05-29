import React from 'react'
import strings from './../../i18n/strings.json'
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
            <Title>{strings.formcard.create_card_title}</Title>
            <ButtonContainer>
               <AddButton onClick={onCreateForm}>+</AddButton>
            </ButtonContainer>
         </CreateCard>
      )
   }
}

export default CreateFormCard
