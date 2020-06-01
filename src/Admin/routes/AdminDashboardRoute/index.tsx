import React from 'react'
import ProtectedRoute from '../../../Common/routes/ProtectedRoute'
import { paths } from '../../../Common/constants/Paths'
import DashboardRoute from './DashboardRoute'

const dashboardRoute = (
   <ProtectedRoute
      key={paths.dashboard}
      path={paths.dashboard}
      component={DashboardRoute}
   />
)

export { dashboardRoute }
