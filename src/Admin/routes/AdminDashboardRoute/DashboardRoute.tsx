import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { LOGIN_PATH } from '../../../Authentication/constants/Paths'
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
      history.replace(`/form/${formId}/v1`)
   }

   renderFormsList = () => {
      const {
         formList,
         onCreateForm,
         onDeleteForm,
         postFormsAPIStatus,
         updateFormsAPIError
      } = this.props.formStore
      return (
         <FormList
            onCreateForm={onCreateForm}
            onDeleteForm={onDeleteForm}
            createFormApiStatus={postFormsAPIStatus}
            formsList={formList}
            apiError={updateFormsAPIError}
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