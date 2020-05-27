import React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { MdMoreHoriz } from 'react-icons/md'
import {
   FormCardContainer,
   FormName,
   NameContainer,
   FooterContainer,
   IconContainer,
   ResponseButton,
   OptionsList,
   OptionItem
} from './styledComponents'

@observer
class FormCard extends React.Component {
   @observable isListOpen: boolean = false

   @action.bound
   onToogleList() {
      this.isListOpen = !this.isListOpen
   }
   render() {
      return (
         <FormCardContainer>
            <NameContainer>
               <FormName>New form</FormName>
            </NameContainer>
            <FooterContainer>
               <ResponseButton>No responses</ResponseButton>
               {!this.isListOpen ? (
                  <IconContainer onClick={this.onToogleList}>
                     <MdMoreHoriz />
                  </IconContainer>
               ) : (
                  <OptionsList onBlur={this.onToogleList}>
                     <OptionItem>View</OptionItem>
                     <OptionItem>Rename</OptionItem>
                     <OptionItem>Delete</OptionItem>
                  </OptionsList>
               )}
            </FooterContainer>
         </FormCardContainer>
      )
   }
}

export { FormCard }
