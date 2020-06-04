import React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { API_SUCCESS, API_FETCHING } from '@ib/api-constants'

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
   @action.bound
   onShowOrHideDialog() {
      this.shouldShowDialog = !this.shouldShowDialog
   }

   @action.bound
   async onClickContinue(name) {
      const { onCreateForm } = this.props.formStore
      onCreateForm(name)
   }

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
      if (postFormsAPIStatus !== API_SUCCESS && this.shouldShowDialog) {
         return (
            <FormNameDialog
               defaultValue={strings.popup.empty}
               onClickContinue={this.onClickContinue}
               caption={strings.popup.createCaption}
               onShowOrHideDialog={this.onShowOrHideDialog}
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
            <CreateFormCard onCreateForm={this.onShowOrHideDialog} />
            {this.renderFormCards()}
         </FormListContainer>
      )
   }
}

export { FormList }
