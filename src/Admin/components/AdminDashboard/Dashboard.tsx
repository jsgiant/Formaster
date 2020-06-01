import React from 'react'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import Header from '../../../Common/components/Header/Header'
import { DashboardWrapper } from './styledComponents'

type DashboardProps = {
   onLogoutClick: () => void
   isAdmin: boolean
   apiStatus: number
   apiError: any
   onRetryClick: () => void
   successUI: () => any
}

class Dashboard extends React.Component<DashboardProps> {
   render() {
      const {
         onLogoutClick,
         apiError,
         apiStatus,
         onRetryClick,
         successUI: SuccessUI
      } = this.props
      return (
         <DashboardWrapper>
            <Header onLogoutClick={onLogoutClick} />
            <LoadingWrapperWithFailure
               apiStatus={apiStatus}
               apiError={apiError}
               onRetryClick={onRetryClick}
               renderSuccessUI={SuccessUI}
            />
         </DashboardWrapper>
      )
   }
}
export { Dashboard }
