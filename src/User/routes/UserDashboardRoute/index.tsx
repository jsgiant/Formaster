import React, { lazy } from 'react'
import ProtectedRoute from '../../../Common/routes/ProtectedRoute'
import { paths } from '../../../Common/constants/Paths'

const UserDashboardRoute = lazy(() =>
   import('../UserDashboardRoute/UserDashboardRoute')
)
const { userDashboard: path } = paths
const userDashboardRoute = (
   <ProtectedRoute key={path} path={path} component={UserDashboardRoute} />
)
export { userDashboardRoute }
