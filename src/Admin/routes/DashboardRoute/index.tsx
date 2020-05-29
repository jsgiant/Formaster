import React from 'react'
import { DashboardRoute } from './DashboardRoute'
import ProtectedRoute from '../../../common/routes/ProtectedRoute'
import { paths } from '../../../common/constants/Paths'

const dashboardRoute = (
   <ProtectedRoute
      key={paths.dashboard}
      path={paths.dashboard}
      component={DashboardRoute}
   />
)

export { dashboardRoute }
