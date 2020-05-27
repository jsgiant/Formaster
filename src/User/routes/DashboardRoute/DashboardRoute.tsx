import React from 'react'
import { inject, observer } from 'mobx-react'
import ProtectedRoute from '../../../common/routes/ProtectedRoute'
import { paths } from '../../../constants/Paths'
import Dashboard from '../../components/Dashboard'

type DashboardRouteProps = {
   authStore: any
}
@inject('authStore')
@observer
class DashboardRoute extends React.Component<DashboardRouteProps> {
   render() {
      return <ProtectedRoute path={paths.dashboard} component={Dashboard} />
   }
}

export { DashboardRoute }
