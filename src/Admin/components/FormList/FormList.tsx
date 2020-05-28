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
}

@observer
class FormList extends React.Component<FormListProps> {
   @observable shouldShowPopup: boolean = false
   @action.bound
   onTogglePopup() {
      this.shouldShowPopup = !this.shouldShowPopup
   }

   @action.bound
   onClickContinue(name) {
      this.onTogglePopup()
      const { onCreateForm } = this.props
      onCreateForm({
         id: 45,
         name: name,
         questions: []
      })
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
            <CreateFormCard onCreateForm={this.onTogglePopup} />
            {this.renderFormCards()}
         </FormListContainer>
      )
   }
}

export { FormList }
