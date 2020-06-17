import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { LOGIN_PATH } from '../../../Authentication/constants/paths'

import { isLoggedIn } from '../../utils/AuthUtils'

type ProtectedRouteProps = {
   component: any
   path: any
}
export class ProtectedRoute extends React.Component<ProtectedRouteProps> {
   render() {
      const { path, component: Component } = this.props
      if (!isLoggedIn()) {
         return <Redirect to={LOGIN_PATH} />
      } else {
         return <Route exact path={path} component={Component} />
      }
   }
}
