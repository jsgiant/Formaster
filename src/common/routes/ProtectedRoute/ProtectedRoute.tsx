import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getAccessToken } from '../../../utils/StorageUtils'
import { LOGIN_PATH } from '../../../Authentication/constants/Paths'

type ProtectedRouteProps = {
   component: any
   path: any
}
export class ProtectedRoute extends React.Component<ProtectedRouteProps> {
   render() {
      const { path, component: Component } = this.props
      if (getAccessToken()) {
         return <Route exact path={path} component={Component} />
      } else {
         return <Redirect to={LOGIN_PATH} />
      }
   }
}
