import React from 'react'
import { FormRoute } from './FormRoute'
import ProtectedRoute from '../../../common/routes/ProtectedRoute'
import { paths } from '../../../common/constants/Paths'

const formRoute = (
   <ProtectedRoute key={paths.form} path={paths.form} component={FormRoute} />
)

export { formRoute }
