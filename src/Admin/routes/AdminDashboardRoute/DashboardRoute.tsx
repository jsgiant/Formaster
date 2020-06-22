import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Dashboard from '../../../Common/components/Dashboard'
import {
   goToSelectedForm,
   goToLoginForm
} from '../../../Common/utils/NavigationUtils'
import AuthStore from '../../../Authentication/stores/AuthStore'

import FormList from '../../components/FormList'
import FormStore from '../../stores/FormStore'

type DashboardRouteProps = {
   authStore: AuthStore
   history: History
   formStore: FormStore
}
@inject('authStore', 'formStore')
@observer
class DashboardRoute extends React.Component<DashboardRouteProps> {
   onLogoutClick = (): void => {
      const { onSignOut } = this.props.authStore
      const { history } = this.props
      onSignOut()
      goToLoginForm(history)
   }
   componentDidMount() {
      const { getUserForms } = this.props.formStore
      getUserForms()
   }

   onClickForm = (formId: number) => {
      const { history } = this.props
      goToSelectedForm(history, formId)
   }

   renderFormsList = (): React.ReactNode => (
      <FormList
         formStore={this.props.formStore}
         onClickForm={this.onClickForm}
      />
   )
   render() {
      const {
         getFormsDataAPIStatus,
         getFormsDataAPIError,
         getUserForms
      } = this.props.formStore

      return (
         <Dashboard
            apiError={getFormsDataAPIError}
            apiStatus={getFormsDataAPIStatus}
            onRetryClick={getUserForms}
            onLogoutClick={this.onLogoutClick}
            successUI={this.renderFormsList}
         />
      )
   }
}

export default withRouter(DashboardRoute)
