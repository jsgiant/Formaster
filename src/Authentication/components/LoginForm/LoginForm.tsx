import React from 'react'

import strings from '../../i18n/strings.json'
import {
   LoginContainer,
   LoginFormWrapper,
   Logo,
   Heading,
   Label,
   UserInput,
   ValidationError,
   LoginButton
} from './styledComponents'

type LoginFormProps = {
   userName: any
   password: any
   errorMessage: string
   onClickLogin: () => void
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
         onChangeUsername
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

               <LoginButton data-testid='login-btn' onClick={onClickLogin}>
                  Login
               </LoginButton>
            </LoginFormWrapper>
         </LoginContainer>
      )
   }
}

export { LoginForm }
