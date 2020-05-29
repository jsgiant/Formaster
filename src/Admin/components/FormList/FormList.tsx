import React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import strings from '../../i18n/strings.json'
import CreateFormCard from '../CreateFormCard/CreateFormCard'
import FormCard from '../FormCard'
import FormNamePopup from '../FormNamePopup'
import { FormListContainer } from './styledComponents'

type FormListProps = {
   formsList: any
   onDeleteForm: (form) => void
   onCreateForm: (form) => void
   onClickForm: (form) => void
   apiError: string
}

@observer
class FormList extends React.Component<FormListProps> {
   @observable shouldShowPopup: boolean = false
   @action.bound
   onShowPopup() {
      this.shouldShowPopup = !this.shouldShowPopup
   }

   @action.bound
   async onClickContinue(name) {
      this.onShowPopup()
      const { onCreateForm } = this.props

      onCreateForm(name)
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

   render() {
      return (
         <FormListContainer>
            {this.shouldShowPopup && (
               <FormNamePopup
                  onClickContinue={this.onClickContinue}
                  caption={strings.popup.createCaption}
               />
            )}
            <CreateFormCard onCreateForm={this.onShowPopup} />
            {this.renderFormCards()}
         </FormListContainer>
      )
   }
}

export { FormList }
