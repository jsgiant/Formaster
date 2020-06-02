import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { UserFormListContainer } from './styledComponents'
import UserFormCard from '../UserFormCard/UserFormCard'

type UserFormListProps = {
   formsList: any
   onClickForm: (formId) => void
}

@observer
class UserFormList extends Component<UserFormListProps> {
   renderFormCards = () => {
      const { formsList, onClickForm } = this.props
      return formsList.map(form => {
         return (
            <UserFormCard
               key={form.form_id}
               formName={form.form_name}
               formId={form.form_id}
               onClickForm={onClickForm}
            />
         )
      })
   }
   render() {
      return (
         <UserFormListContainer>{this.renderFormCards()}</UserFormListContainer>
      )
   }
}

export default UserFormList
