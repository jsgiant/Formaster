import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

import strings from './../../i18n/strings.json'
import LoginForm from '../../components/LoginForm'

type LoginFormRouteProps = {
   authStore: any
}
@inject('authStore')
@observer
class LoginFormRoute extends React.Component<LoginFormRouteProps> {
   @observable userName = strings.empty
   @observable password = strings.empty
   @observable errorMessage = strings.empty

   onClickLogin = () => {
      const { userLogin } = this.props.authStore
      userLogin(
         {
            username: this.userName,
            password: this.password
         },
         this.onLoginSuccess,
         this.onLoginFailure
      )
   }

   onLoginSuccess = () => {
      console.log('success')
   }

   onLoginFailure = error => {
      console.log('failed', error)
      // should show error message
   }

   @action
   onChangeUsername = e => {
      this.userName = e.target.value
   }

   @action
   onChangePassword = e => {
      this.password = e.target.value
   }

   render() {
      return (
         <LoginForm
            userName={this.userName}
            password={this.password}
            onClickLogin={this.onClickLogin}
            onChangeUsername={this.onChangeUsername}
            onChangePassword={this.onChangePassword}
         />
      )
   }
}

export { LoginFormRoute }
