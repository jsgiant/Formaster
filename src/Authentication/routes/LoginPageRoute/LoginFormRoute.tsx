import React from 'react'
import { withRouter } from 'react-router-dom'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

import { paths } from '../../../Common/constants/Paths'
import { getAccessToken, isAdmin } from '../../../Common/utils/StorageUtils'
import messages from './../../i18n/messages.json'
import strings from './../../i18n/strings.json'
import LoginForm from '../../components/LoginForm'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'

type LoginFormRouteProps = {
   authStore: any
   history: any
}

@inject('authStore')
@observer
class LoginFormRoute extends React.Component<LoginFormRouteProps> {
   @observable userName = strings.login.empty
   @observable password = strings.login.empty
   @observable errorMessage = strings.login.empty

   @action.bound
   onClickLogin() {
      const { userLogin } = this.props.authStore
      if (
         this.userName !== strings.login.empty &&
         this.password !== strings.login.empty
      ) {
         this.errorMessage = strings.login.empty
         userLogin(
            {
               username: this.userName,
               password: this.password
            },
            this.onLoginSuccess,
            this.onLoginFailure
         )
      } else {
         this.errorMessage = messages.errors.emptyError
      }
   }

   onLoginSuccess = () => {
      const { history } = this.props

      const path = isAdmin() ? paths.dashboard : paths.userDashboard
      history.replace(path)
      return null
   }

   @action.bound
   onLoginFailure(error) {
      this.errorMessage = getUserDisplayableErrorMessage(error)
      console.log(this.errorMessage)
   }

   @action.bound
   onChangeUserName(e) {
      this.userName = e.target.value
   }

   @action.bound
   onChangePassword(e) {
      this.password = e.target.value
   }

   render() {
      const { getLoginAPIStatus } = this.props.authStore
      if (getAccessToken() !== undefined) {
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
