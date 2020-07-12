import React, { lazy } from 'react'
import ProtectedRoute from '../../../Common/routes/ProtectedRoute'
import { paths } from '../../../Common/constants/Paths'

const SelectedFormRoute = lazy(() => import('./SelectedFormRoute'))

export const selectedFormRoute = (
   <ProtectedRoute
      key={paths.selectedFormUrl}
      path='/form/:form_id/response/'
      component={SelectedFormRoute}
   />
)
