import React from 'react'
import { Route } from 'react-router-dom'
import { DashboardRoute } from './DashboardRoute'
import { paths } from '../../../constants/Paths'

const dashboardRoute = (
   <Route
      key={paths.dashboard}
      path={paths.dashboard}
      component={DashboardRoute}
   />
)

export { dashboardRoute }
