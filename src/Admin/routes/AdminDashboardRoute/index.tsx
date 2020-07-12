import React, { lazy } from 'react'
import ProtectedRoute from '../../../Common/routes/ProtectedRoute'
import { paths } from '../../../Common/constants/Paths'

const DashboardRoute = lazy(() => import('./DashboardRoute'))

const dashboardRoute = (
   <ProtectedRoute
      key={paths.dashboard}
      path={paths.dashboard}
      component={DashboardRoute}
   />
)

export { dashboardRoute }
