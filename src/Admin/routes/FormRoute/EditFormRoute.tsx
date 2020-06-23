import React from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import {
   goToLoginForm,
   goToAdminDashboard
} from '../../../Common/utils/NavigationUtils'

import EditForm from '../../components/EditForm'
import AuthStore from '../../../Authentication/stores/AuthStore'
import FormStore from '../../stores/FormStore'

interface match {
   params: { form_id: number }
   isExact: boolean
   path: string
   url: string
}
type EditFormRouteProps = {
   authStore: AuthStore
   formStore: FormStore
   history: History
   match: match
}

@inject('authStore', 'formStore')
@observer
class EditFormRoute extends React.Component<EditFormRouteProps> {
   componentDidMount() {
      const { getFormQuestions } = this.props.formStore
      getFormQuestions(this.getFormId())
   }

   getFormId = (): number => {
      return this.props.match.params.form_id
   }

   onClickLogout = (): void => {
      const { onSignOut } = this.props.authStore
      const { history } = this.props
      onSignOut()
      goToLoginForm(history)
   }

   onNavigateBack = (): void => {
      const { history } = this.props
      goToAdminDashboard(history)
   }

   renderSuccessUI = (): React.ReactNode => {
      const { currentForm } = this.props.formStore
      return (
         <EditForm
            onClickLogout={this.onClickLogout}
            onNavigateBack={this.onNavigateBack}
            formDetails={currentForm}
            formId={this.getFormId()}
         />
      )
   }

   render() {
      const {
         getQuestionsAPIStatus,
         getQuestionsAPIError
      } = this.props.formStore
      return (
         <LoadingWrapperWithFailure
            apiStatus={getQuestionsAPIStatus}
            apiError={getQuestionsAPIError}
            onRetryClick={this.onNavigateBack}
            renderSuccessUI={this.renderSuccessUI}
         />
      )
   }
}

export default withRouter(EditFormRoute)
