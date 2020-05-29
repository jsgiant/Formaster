import React from 'react'
import { API_FETCHING } from '@ib/api-constants'
import Loader from 'react-loader-spinner'

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

type LoginFormProps = {
   userName: any
   password: any
   errorMessage: string
   onClickLogin: () => void
   apiStatus: number
   onChangeUsername: (e) => void
   onChangePassword: (e) => void
}

class LoginForm extends React.Component<LoginFormProps> {
   render() {
      const {
         userName,
         password,
         errorMessage,
         onClickLogin,
         onChangePassword,
         onChangeUsername,
         apiStatus
      } = this.props
      return (
         <LoginContainer>
            <LoginFormWrapper>
               <Logo src={strings.login.logoURL} alt={strings.login.logoAlt} />
               <Heading>{strings.login.loginHeading}</Heading>
               <ValidationError>{errorMessage}</ValidationError>
               <Label>{strings.login.usernameLabel}</Label>
               <UserInput
                  onChange={onChangeUsername}
                  value={userName}
                  type='name'
                  placeholder={strings.login.usernamePlaceholder}
               />
               <Label>{strings.login.passwordLabel}</Label>
               <UserInput
                  onChange={onChangePassword}
                  value={password}
                  type='password'
                  placeholder={strings.login.passwordPlaceholder}
               />

               {apiStatus === API_FETCHING ? (
                  <LoginButtonWhileLoading>
                     <Loader
                        type='TailSpin'
                        color='#f3f3f3'
                        height={20}
                        width={20}
                     />
                  </LoginButtonWhileLoading>
               ) : (
                  <LoginButton data-testid='login-btn' onClick={onClickLogin}>
                     Login
                  </LoginButton>
               )}
            </LoginFormWrapper>
         </LoginContainer>
      )
   }
}

export { LoginForm }
