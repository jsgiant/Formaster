import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import strings from './../../i18n/strings.json'
import LoginForm from '../../components/LoginForm'
import { paths } from '../../../constants/Paths'

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

   onClickLogin = () => {
      console.log('logged in')
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
      const { history } = this.props
      history.push(paths.dashboard)
   }

   @action.bound
   onLoginFailure(error) {
      this.errorMessage = error.response
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
