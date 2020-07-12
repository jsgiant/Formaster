import React, { lazy } from 'react'
import { Route } from 'react-router-dom'
import { LOGIN_PATH } from '../../constants/Paths'

const LoginFormRoute = lazy(() => import('./LoginFormRoute'))

const loginFormRoute = (
   <Route key={LOGIN_PATH} path={LOGIN_PATH} component={LoginFormRoute} />
)

export { loginFormRoute }
