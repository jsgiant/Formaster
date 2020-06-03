import React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { API_SUCCESS } from '@ib/api-constants'

import strings from '../../i18n/strings.json'

import CreateFormCard from '../CreateFormCard/CreateFormCard'
import FormCard from '../FormCard'
import FormNameDialog from '../FormNameDialog'

import { FormListContainer } from './styledComponents'

type FormListProps = {
   formsList: any
   onDeleteForm: (form) => void
   onCreateForm: (form) => void
   onClickForm: (form) => void
   createFormApiStatus: number
   apiError: string
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
      const { onCreateForm } = this.props
      onCreateForm(name)
      // this.onShowDialog()
   }

   renderFormCards = () => {
      const { formsList, onDeleteForm, onClickForm } = this.props
      return formsList.map(form => {
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
      const { createFormApiStatus } = this.props

      if (this.shouldShowDialog && createFormApiStatus !== API_SUCCESS) {
         return (
            <FormNameDialog
               defaultValue=''
               onClickContinue={this.onClickContinue}
               caption={strings.popup.createCaption}
               onShowOrHideDialog={this.onShowOrHideDialog}
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
