import React from 'react'
import ProtectedRoute from '../../../Common/routes/ProtectedRoute'
import { paths } from '../../../Common/constants/Paths'
import EditFormRoute from './EditFormRoute'

const editFormRoute = (
   <ProtectedRoute
      key={paths.form}
      path='/form/:form_id/v1/'
      component={EditFormRoute}
   />
)

export { editFormRoute }
