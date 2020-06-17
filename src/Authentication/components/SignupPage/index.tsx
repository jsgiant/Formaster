import React from 'react'

type SignupFormProps = {
   name: string
   userName: any
   password: any
   confirmPassword: any
   onChangeName: (event) => void
   onChangeUserName: (event) => void
   onChangePassword: (event) => void
   onChangeConfirmPassword: (event) => void
   onClickSignup: (event) => void
}

class SignUpPage extends React.Component<SignupFormProps> {
   render() {
      const {
         name,
         userName,
         password,
         confirmPassword,
         onChangeConfirmPassword,
         onChangeName,
         onChangePassword,
         onChangeUserName,
         onClickSignup
      } = this.props
      return <div>SignUp</div>
   }
}

export { SignUpPage }
