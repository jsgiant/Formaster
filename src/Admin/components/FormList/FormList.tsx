import React from 'react'
import { observer } from 'mobx-react'
import { observable, action, reaction } from 'mobx'
import { API_SUCCESS, API_FETCHING, API_FAILED } from '@ib/api-constants'

import strings from '../../i18n/strings.json'

import CreateFormCard from '../CreateFormCard/CreateFormCard'
import FormCard from '../FormCard'
import FormNameDialog from '../FormNameDialog'

import { FormListContainer } from './styledComponents'

type FormListProps = {
   formStore: any
   onClickForm: (form) => void
}

@observer
class FormList extends React.Component<FormListProps> {
   @observable shouldShowDialog: boolean = false
   @observable isFormCreated

   @action.bound
   onShowDialog() {
      this.shouldShowDialog = true
   }

   @action.bound
   onHideDialog() {
      this.shouldShowDialog = false
   }

   @action.bound
   async onClickContinue(name) {
      const { onCreateForm } = this.props.formStore
      onCreateForm(name)
   }

   reaction = reaction(
      () => {
         const { postFormsAPIStatus } = this.props.formStore
         return postFormsAPIStatus === API_SUCCESS
      },
      isSuccess => {
         if (isSuccess) {
            this.onHideDialog()
         }
      }
   )

   renderFormCards = () => {
      const { formList, onDeleteForm } = this.props.formStore
      const { onClickForm } = this.props
      return formList.map(form => {
         return (
            <FormCard
               key={form.id}
               onDeleteForm={onDeleteForm}
               formDetails={form}
               onClickForm={onClickForm}
            />
         )
      })
   }

   renderFormNameDialog = () => {
      const { postFormsAPIStatus } = this.props.formStore
      const isProcessing = postFormsAPIStatus === API_FETCHING
      if (this.shouldShowDialog) {
         return (
            <FormNameDialog
               defaultValue={strings.popup.empty}
               onClickContinue={this.onClickContinue}
               caption={strings.popup.createCaption}
               onShowOrHideDialog={this.onHideDialog}
               isProcessing={isProcessing}
            />
         )
      }
      return
   }

   render() {
      return (
         <FormListContainer>
            {this.renderFormNameDialog()}
            <CreateFormCard onCreateForm={this.onShowDialog} />
            {this.renderFormCards()}
         </FormListContainer>
      )
   }
}

export { FormList }
