import React, { lazy } from 'react'
import ProtectedRoute from '../../../Common/routes/ProtectedRoute'
import { paths } from '../../../Common/constants/Paths'

const EditFormRoute = lazy(() => import('./EditFormRoute'))

const editFormRoute = (
   <ProtectedRoute
      key={paths.form}
      path='/form/:form_id'
      component={EditFormRoute}
   />
)

export { editFormRoute }
