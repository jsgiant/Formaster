import React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { MdMoreHoriz } from 'react-icons/md'
import strings from '../../i18n/strings.json'
import {
   FormCardContainer,
   FormName,
   NameContainer,
   FooterContainer,
   IconContainer,
   ResponseButton,
   OptionsList,
   OptionItem,
   DeleteOption
} from './styledComponents'
import FormNamePopup from '../FormNamePopup'

type FormCardProps = {
   formDetails: any
   onDeleteForm: (form) => void
   onClickForm: (form) => void
}

@observer
class FormCard extends React.Component<FormCardProps> {
   @observable isListOpen: boolean = false
   @observable shouldShowPopup: boolean = false

   @action.bound
   onToogleList() {
      this.isListOpen = !this.isListOpen
   }

   @action.bound
   onFormRename() {
      this.onToogleList()
      this.shouldShowPopup = !this.shouldShowPopup
   }
   @action.bound
   onClickContinue(name) {
      this.shouldShowPopup = false
      const { onRenameForm } = this.props.formDetails
      onRenameForm(name)
   }

   onDeleteForm = () => {
      const { onDeleteForm, formDetails } = this.props
      onDeleteForm(formDetails)
   }

   render() {
      const { formDetails, onClickForm } = this.props
      return (
         <FormCardContainer>
            <NameContainer onClick={onClickForm}>
               <FormName>{formDetails.name}</FormName>
            </NameContainer>
            <FooterContainer>
               <ResponseButton>No responses</ResponseButton>
               {!this.isListOpen ? (
                  <IconContainer
                     data-testid='test-toggle'
                     onClick={this.onToogleList}
                  >
                     <MdMoreHoriz />
                  </IconContainer>
               ) : (
                  <OptionsList onFocusCapture={this.onToogleList}>
                     <OptionItem onClick={this.onToogleList}>View</OptionItem>
                     <OptionItem onClick={this.onFormRename}>Rename</OptionItem>
                     <DeleteOption onClick={this.onDeleteForm}>
                        Delete
                     </DeleteOption>
                  </OptionsList>
               )}

               {this.shouldShowPopup && (
                  <FormNamePopup
                     onClickContinue={this.onClickContinue}
                     caption={strings.popup.renameCaption}
                  />
               )}
            </FooterContainer>
         </FormCardContainer>
      )
   }
}

export { FormCard }
