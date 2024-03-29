import React, { Component } from 'react'
import { observer } from 'mobx-react'
import UserFormCard from '../UserFormCard/UserFormCard'
import { UserFormListContainer } from './styledComponents'
import { Form } from '../../stores/types'

type UserFormListProps = {
   formsList: Array<Form>
   onClickForm: (formId: number) => void
}

@observer
class UserFormList extends Component<UserFormListProps> {
   renderFormCards = () => {
      const { formsList, onClickForm } = this.props
      return formsList.map(form => {
         const { form_id: id, form_name: name } = form
         return (
            <UserFormCard
               key={id}
               formName={name}
               formId={id}
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
