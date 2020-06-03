import React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { MdMoreHoriz } from 'react-icons/md'
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button'
import '@reach/menu-button/styles.css'
import strings from '../../i18n/strings.json'
import FormNamePopup from '../FormNameDialog'
import {
   FormCardContainer,
   FormName,
   NameContainer,
   FooterContainer,
   ResponseButton
} from './styledComponents'

type FormCardProps = {
   formDetails: any
   onDeleteForm: (form) => void
   onClickForm: (form) => void
}

@observer
class FormCard extends React.Component<FormCardProps> {
   @observable isListOpen: boolean = false
   @observable shouldShowDialog: boolean = false

   @action.bound
   onToogleList() {
      this.isListOpen = !this.isListOpen
   }

   @action.bound
   onShowOrHideDialog() {
      this.shouldShowDialog = !this.shouldShowDialog
   }

   @action.bound
   onFormRename() {
      this.onToogleList()
      this.onShowOrHideDialog()
   }
   @action.bound
   onClickContinue(name) {
      this.onShowOrHideDialog()
      const { onRenameForm } = this.props.formDetails
      onRenameForm(name)
   }

   onDeleteForm = () => {
      const { onDeleteForm, formDetails } = this.props
      onDeleteForm(formDetails)
   }

   renderMenuBar = () => {
      return (
         <Menu>
            <MenuButton>
               <MdMoreHoriz data-testid='test-toggle' />
            </MenuButton>
            <MenuList>
               <MenuItem onSelect={() => {}}>View</MenuItem>
               <MenuItem onSelect={this.onFormRename}>Rename</MenuItem>
               <MenuItem onSelect={this.onDeleteForm}>Delete</MenuItem>
            </MenuList>
         </Menu>
      )
   }

   render() {
      const { onClickForm } = this.props
      const { name, id } = this.props.formDetails
      return (
         <FormCardContainer>
            <NameContainer onClick={() => onClickForm(id)}>
               <FormName>{name}</FormName>
            </NameContainer>
            <FooterContainer>
               <ResponseButton>No responses</ResponseButton>
               {this.renderMenuBar()}

               {this.shouldShowDialog && (
                  <FormNamePopup
                     defaultValue={name}
                     onClickContinue={this.onClickContinue}
                     caption={strings.popup.renameCaption}
                     onShowOrHideDialog={this.onShowOrHideDialog}
                  />
               )}
            </FooterContainer>
         </FormCardContainer>
      )
   }
}

export { FormCard }
