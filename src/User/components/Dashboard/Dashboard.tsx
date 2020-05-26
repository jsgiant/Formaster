import React from 'react'
import Header from '../../../common/components/Header/Header'
import { DashboardWrapper } from './styledComponents'
import FormList from '../FormList'
import { observer } from 'mobx-react'

@observer
class Dashboard extends React.Component {
   render() {
      return (
         <DashboardWrapper>
            <Header onLogoutClick={() => {}} />
            <FormList />
         </DashboardWrapper>
      )
   }
}
export { Dashboard }
