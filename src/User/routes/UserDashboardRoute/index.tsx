import React from 'react'
import ProtectedRoute from '../../../Common/routes/ProtectedRoute'
import { paths } from '../../../Common/constants/Paths'
import UserDashboardRoute from './UserDashboardRoute'

const { userDashboard: path } = paths
const userDashboardRoute = (
   <ProtectedRoute key={path} path={path} component={UserDashboardRoute} />
)
export { userDashboardRoute }
