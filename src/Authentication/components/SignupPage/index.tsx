import React from 'react'

type SignupFormProps = {
   name: string
   userName: string
   password: string
   confirmPassword: string
}

class SignUpPage extends React.Component<SignupFormProps> {
   render() {
      const {
         name,
         userName,
         password,
         confirmPassword,
      } = this.props
      return <div>SignUp</div>
   }
}

export { SignUpPage }
