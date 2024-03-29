import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

import { isAdmin } from '../../../Common/utils/StorageUtils'
import { isLoggedIn } from '../../../Common/utils/AuthUtils'
import { getFormattedErrorDescription } from '../../../Common/utils/APIUtils'
import {
   goToAdminDashboard,
   goToUserDashboard
} from '../../../Common/utils/NavigationUtils'

import messages from './../../i18n/messages.json'
import strings from './../../i18n/strings.json'
import LoginForm from '../../components/LoginForm'
import AuthStore from '../../stores/AuthStore'

interface LoginFormRouteProps extends RouteComponentProps {}

interface InjectedProps extends LoginFormRouteProps {
   authStore: AuthStore
}

@inject('authStore')
@observer
class LoginFormRoute extends React.Component<LoginFormRouteProps> {
   @observable userName: string = strings.login.empty
   @observable password: string = strings.login.empty
   @observable errorMessage: string = strings.login.empty

   getAuthStore = () => {
      const props = this.props as InjectedProps
      return props.authStore
   }
   @action.bound
   onClickLogin(): void {
      const { userLogin } = this.getAuthStore()
      if (
         this.userName !== strings.login.empty &&
         this.password !== strings.login.empty
      ) {
         this.errorMessage = strings.login.empty
         userLogin(
            {
               userName: this.userName,
               password: this.password
            },
            this.onLoginSuccess,
            this.onLoginFailure
         )
      } else {
         this.errorMessage = messages.errors.emptyError
      }
   }

   onLoginSuccess = (): null => {
      const { history } = this.props

      const path =
         isAdmin() === 'true'
            ? goToAdminDashboard(history)
            : goToUserDashboard(history)

      return null
   }

   @action.bound
   onLoginFailure(error: string): void {
      this.errorMessage = getFormattedErrorDescription(error)
   }

   @action.bound
   onChangeUserName(e: React.ChangeEvent<HTMLInputElement>): void {
      this.userName = e.target.value
   }

   @action.bound
   onChangePassword(e: React.ChangeEvent<HTMLInputElement>): void {
      this.password = e.target.value
   }

   render() {
      const { getLoginAPIStatus } = this.getAuthStore()
      if (isLoggedIn()) {
         return this.onLoginSuccess()
      }
      return (
         <LoginForm
            apiStatus={getLoginAPIStatus}
            userName={this.userName}
            password={this.password}
            errorMessage={this.errorMessage}
            onClickLogin={this.onClickLogin}
            onChangeUserName={this.onChangeUserName}
            onChangePassword={this.onChangePassword}
         />
      )
   }
}

export default withRouter(LoginFormRoute)
