import React, { PureComponent } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import { LOGIN_PATH } from '../../../Authentication/constants/paths'
import Dashboard from '../../../Common/components/Dashboard'
import NoDataView from '../../../Common/components/NoDataView'
import UserFormList from '../../components/UserFormList/UserFormList'

type UserDashboardRouteProps = {
   authStore: any
   history: any
   userFormStore: any
}

@inject('authStore', 'userFormStore')
@observer
class UserDashboardRoute extends PureComponent<UserDashboardRouteProps> {
   componentDidMount() {
      const { getUserForms } = this.props.userFormStore
      getUserForms()
   }

   onClickLogout = () => {
      const { onSignOut } = this.props.authStore
      const { history } = this.props
      onSignOut()
      history.replace(LOGIN_PATH)
   }

   onClickForm = formId => {
      const { history } = this.props
      history.push(`/form/${formId}/response`)
   }

   renderUserFormsList = () => {
      const { userFormsList } = this.props.userFormStore
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
         getUserFormsDataAPIError,
         getUserForms
      } = this.props.userFormStore
      return (
         <Dashboard
            apiError={getUserFormsDataAPIError}
            apiStatus={getUserFormsAPIStatus}
            onRetryClick={getUserForms}
            onLogoutClick={this.onClickLogout}
            successUI={this.renderUserFormsList}
         />
      )
   }
}

export default withRouter(UserDashboardRoute)
