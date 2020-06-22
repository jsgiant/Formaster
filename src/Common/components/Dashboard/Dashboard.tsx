import React from 'react'
import { observer } from 'mobx-react'
import LoadingWrapperWithFailure from '../LoadingWrapperWithFailure'
import Header from '../Header/Header'
import { DashboardWrapper } from './styledComponents'

type DashboardProps = {
   onLogoutClick: () => void
   apiStatus: number
   apiError: any
   onRetryClick: () => void
   successUI: () => any
}

@observer
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
