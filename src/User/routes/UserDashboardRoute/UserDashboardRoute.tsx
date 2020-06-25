import React, { PureComponent } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import Dashboard from '../../../Common/components/Dashboard'
import NoDataView from '../../../Common/components/NoDataView'
import {
   goToLoginForm,
   goToSelectedFormResponse
} from '../../../Common/utils/NavigationUtils'

import UserFormList from '../../components/UserFormList/UserFormList'
import AuthStore from '../../../Authentication/stores/AuthStore'
import UserFormStore from '../../stores/UserFormStore'

interface UserDashboardRouteProps extends RouteComponentProps {}

interface InjectedProps extends UserDashboardRouteProps {
   authStore: AuthStore
   userFormStore: UserFormStore
}

@inject('authStore', 'userFormStore')
@observer
class UserDashboardRoute extends PureComponent<UserDashboardRouteProps> {
   componentDidMount() {
      const { getUserForms } = this.getInjectedProps().userFormStore
      getUserForms()
   }

   getInjectedProps = () => {
      const props = this.props as InjectedProps
      return { authStore: props.authStore, userFormStore: props.userFormStore }
   }

   onClickLogout = () => {
      const { onSignOut } = this.getInjectedProps().authStore
      const { history } = this.props
      onSignOut()
      goToLoginForm(history)
   }

   onClickForm = formId => {
      const { history } = this.props
      goToSelectedFormResponse(history, formId)
   }

   renderUserFormsList = () => {
      const { userFormsList } = this.getInjectedProps().userFormStore
      if (userFormsList.length) {
         return (
            <UserFormList
               formsList={userFormsList}
               onClickForm={this.onClickForm}
            />
         )
      }
      return <NoDataView />
   }

   render() {
      const {
         getUserFormsAPIStatus,
         getUserFormsAPIError,
         getUserForms
      } = this.getInjectedProps().userFormStore
      return (
         <Dashboard
            apiError={getUserFormsAPIError}
            apiStatus={getUserFormsAPIStatus}
            onRetryClick={getUserForms}
            onLogoutClick={this.onClickLogout}
            successUI={this.renderUserFormsList}
         />
      )
   }
}

export default withRouter(UserDashboardRoute)
