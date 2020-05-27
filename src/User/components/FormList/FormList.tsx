import React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import strings from './../../i18n/strings.json'
import CreateFormCard from '../CreateFormCard/CreateFormCard'
import FormCard from '../FormCard'
import FormNamePopup from '../FormNamePopup'
import { FormListContainer } from './styledComponents'

type FormListProps = {
   formsList: any
   onDeleteForm: (form) => void
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
      console.log('form created', name)
   }

   renderFormCards = () => {
      const { formsList, onDeleteForm } = this.props
      return formsList.map(form => {
         return (
            <FormCard
               key={form.id}
               onDeleteForm={onDeleteForm}
               formDetails={form}
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
