import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Dashboard from '../../../Common/components/Dashboard'
import {
   goToSelectedForm,
   goToLoginForm
} from '../../../Common/utils/NavigationUtils'
import AuthStore from '../../../Authentication/stores/AuthStore'

import FormList from '../../components/FormList'
import FormStore from '../../stores/FormStore'

interface DashboardRouteProps extends RouteComponentProps {}
interface InjectedProps extends DashboardRouteProps {
   authStore: AuthStore
   formStore: FormStore
}
@inject('authStore', 'formStore')
@observer
class DashboardRoute extends React.Component<DashboardRouteProps> {
   componentDidMount() {
      const { getUserForms } = this.getInjectedProps().formStore
      getUserForms()
   }

   getInjectedProps = () => {
      const props = this.props as InjectedProps
      return { authStore: props.authStore, formStore: props.formStore }
   }
   onLogoutClick = (): void => {
      const { onSignOut } = this.getInjectedProps().authStore
      const { history } = this.props
      onSignOut()
      goToLoginForm(history)
   }

   onClickForm = (formId: number) => {
      const { history } = this.props
      goToSelectedForm(history, formId)
   }

   renderFormsList = (): React.ReactNode => (
      <FormList
         formStore={this.getInjectedProps().formStore}
         onClickForm={this.onClickForm}
      />
   )
   render() {
      const {
         getFormsDataAPIStatus,
         getFormsDataAPIError,
         getUserForms
      } = this.getInjectedProps().formStore

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
