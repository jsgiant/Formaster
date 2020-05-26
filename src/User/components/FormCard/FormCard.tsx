import React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { MdMoreHoriz } from 'react-icons/md'
import {
   FormCardContainer,
   FormName,
   NameContainer,
   FooterContainer,
   ResponseButton
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
                  <MdMoreHoriz onClick={this.onToogleList} />
               ) : (
                  <ul>
                     <li>hi</li>
                     <li>hello</li>
                  </ul>
               )}
            </FooterContainer>
         </FormCardContainer>
      )
   }
}

export { FormCard }
