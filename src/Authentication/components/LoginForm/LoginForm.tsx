import React from 'react'
import Loader from 'react-loader-spinner'
import { API_FETCHING } from '@ib/api-constants'

import strings from '../../i18n/strings.json'

import {
   LoginContainer,
   LoginFormWrapper,
   Logo,
   Heading,
   Label,
   UserInput,
   ValidationError,
   LoginButton,
   LoginButtonWhileLoading
} from './styledComponents'

export interface LoginFormProps {
   userName: string
   password: string
   errorMessage: string
   onClickLogin: () => void
   apiStatus: number
   onChangeUserName: (e: React.ChangeEvent<HTMLInputElement>) => void
   onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void
}

class LoginForm extends React.Component<LoginFormProps> {
   renderLoginButton = () => {
      const { apiStatus, onClickLogin } = this.props
      return apiStatus === API_FETCHING ? (
         <LoginButtonWhileLoading>
            <Loader type='TailSpin' color='#f3f3f3' height={20} width={20} />
         </LoginButtonWhileLoading>
      ) : (
         <LoginButton data-testid='login-btn' onClick={onClickLogin}>
            Login
         </LoginButton>
      )
   }

   render() {
      const {
         userName,
         password,
         errorMessage,
         onChangePassword,
         onChangeUserName
      } = this.props
      return (
         <LoginContainer>
            <LoginFormWrapper>
               <Logo
                  loading='lazy'
                  src={strings.login.logoURL}
                  alt={strings.login.logoAlt}
               />
               <Heading>{strings.login.loginHeading}</Heading>
               <ValidationError>{errorMessage}</ValidationError>
               <Label>{strings.login.usernameLabel}</Label>
               <UserInput
                  onChange={onChangeUserName}
                  value={userName}
                  type={strings.login.nameType}
                  placeholder={strings.login.usernamePlaceholder}
               />
               <Label>{strings.login.passwordLabel}</Label>
               <UserInput
                  onChange={onChangePassword}
                  value={password}
                  type={strings.login.passwordType}
                  placeholder={strings.login.passwordPlaceholder}
               />
               {this.renderLoginButton()}
            </LoginFormWrapper>
         </LoginContainer>
      )
   }
}

export { LoginForm }
