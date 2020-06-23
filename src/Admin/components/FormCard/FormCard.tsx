import React from 'react'
import { observer } from 'mobx-react'
import { observable, action, reaction } from 'mobx'
import { MdMoreHoriz } from 'react-icons/md'
import { API_FETCHING, API_SUCCESS } from '@ib/api-constants'
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button'
import '@reach/menu-button/styles.css'

import strings from '../../i18n/strings.json'
import FormModel from '../../stores/models/FormModel'

import FormNamePopup from '../FormNameDialog'

import {
   FormCardContainer,
   FormName,
   NameContainer,
   FooterContainer,
   ResponseButton
} from './styledComponents'

type FormCardProps = {
   formDetails: FormModel
   onDeleteForm: (form: FormModel) => void
   onClickForm: (formId: number) => void
   isProcessing: boolean
}

@observer
class FormCard extends React.Component<FormCardProps> {
   @observable isListOpen: boolean = false
   @observable shouldShowDialog: boolean = false

   @action.bound
   onToogleList(): void {
      this.isListOpen = !this.isListOpen
   }

   @action.bound
   onShowOrHideDialog(): void {
      this.shouldShowDialog = !this.shouldShowDialog
   }

   @action.bound
   onFormRename(): void {
      this.onToogleList()
      this.onShowOrHideDialog()
   }
   @action.bound
   onClickContinue(name: string): void {
      const { onRenameForm } = this.props.formDetails
      onRenameForm(name)
   }

   reaction = reaction(
      (): boolean => {
         const { putFormsAPIStatus } = this.props.formDetails
         return putFormsAPIStatus === API_SUCCESS
      },
      isSuccess => {
         if (isSuccess) {
            this.onShowOrHideDialog()
         }
      }
   )
   onDeleteForm = (): void => {
      const { onDeleteForm, formDetails } = this.props
      onDeleteForm(formDetails)
   }

   renderMenuBar = (): React.ReactNode => {
      return (
         <Menu>
            <MenuButton>
               <MdMoreHoriz data-testid='test-toggle' />
            </MenuButton>
            <MenuList>
               <MenuItem onSelect={this.onFormRename}>Rename</MenuItem>
               <MenuItem onSelect={this.onDeleteForm}>Delete</MenuItem>
            </MenuList>
         </Menu>
      )
   }

   renderFormNameDialog = (): React.ReactNode | null => {
      const { name, putFormsAPIStatus } = this.props.formDetails
      const isProcessing = putFormsAPIStatus === API_FETCHING
      return this.shouldShowDialog ? (
         <FormNamePopup
            defaultValue={name}
            onClickContinue={this.onClickContinue}
            caption={strings.popup.renameCaption}
            onShowOrHideDialog={this.onShowOrHideDialog}
            isProcessing={isProcessing}
         />
      ) : null
   }

   render() {
      const { onClickForm, isProcessing } = this.props
      const { name, id } = this.props.formDetails

      return (
         <FormCardContainer isLoading={isProcessing}>
            <NameContainer
               data-testid='test-form'
               onClick={() => onClickForm(id!)}
            >
               <FormName>{name}</FormName>
            </NameContainer>
            <FooterContainer>
               <ResponseButton>No responses</ResponseButton>
               {this.renderMenuBar()}
            </FooterContainer>
            {this.renderFormNameDialog()}
         </FormCardContainer>
      )
   }
}

export { FormCard }
