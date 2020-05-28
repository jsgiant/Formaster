import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

import messages from './../../i18n/messages.json'
import strings from './../../i18n/strings.json'
import LoginForm from '../../components/LoginForm'
import { paths } from '../../../constants/Paths'
import { getAccessToken } from '../../../utils/StorageUtils'

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
      history.push(paths.dashboard)
      return null
   }

   @action.bound
   onLoginFailure(error) {
      this.errorMessage = error
   }

   @action.bound
   onChangeUsername(e) {
      this.userName = e.target.value
   }

   @action.bound
   onChangePassword(e) {
      this.password = e.target.value
   }

   render() {
      if (getAccessToken() !== undefined) {
         return this.onLoginSuccess()
      }
      return (
         <LoginForm
            userName={this.userName}
            password={this.password}
            errorMessage={this.errorMessage}
            onClickLogin={this.onClickLogin}
            onChangeUsername={this.onChangeUsername}
            onChangePassword={this.onChangePassword}
         />
      )
   }
}

export { LoginFormRoute }
