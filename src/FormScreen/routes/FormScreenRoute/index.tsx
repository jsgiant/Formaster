import React from 'react'
import { FormScreenRoute } from './FormScreenRoute'
import ProtectedRoute from '../../../common/routes/ProtectedRoute'
import { paths } from '../../../constants/Paths'

const formRoute = (
   <ProtectedRoute
      key={paths.form}
      path={paths.form}
      component={FormScreenRoute}
   />
)

export { formRoute }
