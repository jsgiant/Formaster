import React from 'react'
import { inject, observer } from 'mobx-react'
import Dashboard from '../../components/Dashboard'
import { LOGIN_PATH } from '../../../Authentication/constants/Paths'
import FormList from '../../components/FormList'
import { paths } from '../../../constants/Paths'

type DashboardRouteProps = {
   authStore: any
   history: any
   formStore: any
}
@inject('authStore', 'formStore')
@observer
class DashboardRoute extends React.Component<DashboardRouteProps> {
   onLogoutClick = () => {
      const { onSignOut } = this.props.authStore
      const { history } = this.props
      onSignOut()
      this.props.history.push(LOGIN_PATH)
   }
   componentDidMount() {
      const { getUserForms } = this.props.formStore
      getUserForms()
   }

   onClickForm = form => {
      const { history } = this.props
      history.push(paths.form)
   }

   renderFormsList = () => {
      const { onDeleteForm, onCreateForm } = this.props.authStore
      const { formList } = this.props.formStore
      return (
         <FormList
            onCreateForm={onCreateForm}
            onDeleteForm={onDeleteForm}
            formsList={formList}
            onClickForm={this.onClickForm}
         />
      )
   }
   render() {
      const { isAdmin } = this.props.authStore
      const {
         getFormsDataAPIStatus,
         getFormsDataAPIError,
         getUserForms
      } = this.props.formStore
      return (
         <Dashboard
            apiError={getFormsDataAPIError}
            apiStatus={getFormsDataAPIStatus}
            isAdmin={isAdmin}
            onRetryClick={getUserForms}
            onLogoutClick={this.onLogoutClick}
            successUI={this.renderFormsList}
         />
      )
   }
}

export { DashboardRoute }
