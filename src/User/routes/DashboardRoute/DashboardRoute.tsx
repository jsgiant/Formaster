import React from 'react'
import { inject, observer } from 'mobx-react'
import Dashboard from '../../components/Dashboard'
import { LOGIN_PATH } from '../../../Authentication/constants/Paths'

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
      onSignOut()
      this.props.history.push(LOGIN_PATH)
   }
   render() {
      const { isAdmin } = this.props.authStore
      const { formList, onDeleteForm } = this.props.formStore
      return (
         <Dashboard
            isAdmin={isAdmin}
            onLogoutClick={this.onLogoutClick}
            formsList={formList}
            onDeleteForm={onDeleteForm}
         />
      )
   }
}

export { DashboardRoute }
