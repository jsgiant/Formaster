import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { toast } from 'react-toastify'
import { LOGIN_PATH } from '../../../Authentication/constants/paths'
import Dashboard from '../../../Common/components/Dashboard'
import FormList from '../../components/FormList'

type DashboardRouteProps = {
   authStore: any
   history: any
   formStore: any
}
@inject('authStore', 'formStore')
@observer
class DashboardRoute extends React.Component<DashboardRouteProps> {
   onLogoutClick = () => {
      const { onSignOut } = this.props.authStore
      const { history } = this.props
      onSignOut()
      history.push(LOGIN_PATH)
   }
   componentDidMount() {
      const { getUserForms } = this.props.formStore
      getUserForms()
   }

   onClickForm = formId => {
      const { history } = this.props
      history.replace(`/form/${formId}`)
   }

   renderFormsList = () => {
      // toast.error('Wow so easy!', {
      //    position: 'bottom-center',
      //    autoClose: 5000,
      //    hideProgressBar: true,
      //    closeOnClick: true,
      //    pauseOnHover: false,
      //    draggable: true,
      //    progress: undefined
      // })

      return (
         <FormList
            formStore={this.props.formStore}
            onClickForm={this.onClickForm}
         />
      )
   }
   render() {
      const {
         getFormsDataAPIStatus,
         getFormsDataAPIError,
         getUserForms
      } = this.props.formStore

      return (
         <Dashboard
            apiError={getFormsDataAPIError}
            apiStatus={getFormsDataAPIStatus}
            onRetryClick={getUserForms}
            onLogoutClick={this.onLogoutClick}
            successUI={this.renderFormsList}
         />
      )
   }
}

export default withRouter(DashboardRoute)
