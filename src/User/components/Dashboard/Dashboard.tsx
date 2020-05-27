import React from 'react'
import Header from '../../../common/components/Header/Header'
import { DashboardWrapper } from './styledComponents'
import FormList from '../FormList'

type DashboardProps = {
   onLogoutClick: () => void
   isAdmin: boolean
   formsList: any
   onDeleteForm: (form) => void
}

class Dashboard extends React.Component<DashboardProps> {
   render() {
      const { onLogoutClick, formsList, onDeleteForm } = this.props
      return (
         <DashboardWrapper>
            <Header onLogoutClick={onLogoutClick} />
            <FormList onDeleteForm={onDeleteForm} formsList={formsList} />
         </DashboardWrapper>
      )
   }
}
export { Dashboard }
