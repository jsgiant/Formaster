import React from 'react'
import { Route } from 'react-router-dom'
import { LOGIN_PATH } from '../../constants/Paths'
import LoginFormRoute from './LoginFormRoute'

const loginFormRoute = (
   <Route key={LOGIN_PATH} path={LOGIN_PATH} component={LoginFormRoute} />
)

export { loginFormRoute }
