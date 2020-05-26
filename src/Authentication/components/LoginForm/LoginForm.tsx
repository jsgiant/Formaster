import React from 'react'

import './index.css'

type LoginFormProps = {
   userName: any
   password: any
   onClickLogin: () => void
   onChangeUsername: (e) => void
   onChangePassword: (e) => void
}

class LoginForm extends React.Component<LoginFormProps> {
   render() {
      const {
         userName,
         password,
         onClickLogin,
         onChangePassword,
         onChangeUsername
      } = this.props
      return (
         <div className='login-container'>
            <div className='login-form'>
               <img
                  className='logo'
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/d1119fe1-4f3a-40fd-860b-3adee7ca7915.svg'
                  alt='ibhubs_logo'
               />
               <p className='heading'> Hi there, please login!</p>
               <label className='label' htmlFor='user-input'>
                  USERNAME
               </label>
               <input
                  onChange={onChangeUsername}
                  className='user-input'
                  value={userName}
                  type='name'
                  placeholder='Username'
               />
               <label className='label' htmlFor='user-input'>
                  PASSWORD
               </label>
               <input
                  onChange={onChangePassword}
                  className='user-input'
                  value={password}
                  type='password'
                  placeholder='Password'
               />
               <button onClick={onClickLogin} className='login-btn'>
                  Login
               </button>
            </div>
         </div>
      )
   }
}

export { LoginForm }
