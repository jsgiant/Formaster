import React from 'react'
import ProtectedRoute from '../../../Common/routes/ProtectedRoute'
import { paths } from '../../../Common/constants/Paths'
import { FormRoute } from './FormRoute'

const formRoute = (
   <ProtectedRoute
      key={paths.form}
      path='/form/:form_id/v1/'
      component={FormRoute}
   />
)

export { formRoute }
