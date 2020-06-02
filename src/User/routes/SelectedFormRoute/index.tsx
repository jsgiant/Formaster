import React from 'react'
import ProtectedRoute from '../../../Common/routes/ProtectedRoute'
import { paths } from '../../../Common/constants/Paths'
import { SelectedFormRoute } from './SelectedFormRoute'

export const selectedFormRoute = (
   <ProtectedRoute
      key={paths.selectedFormUrl}
      path='/form/:form_id/response/v1/'
      component={SelectedFormRoute}
   />
)
