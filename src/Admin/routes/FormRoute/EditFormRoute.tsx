import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import {
   goToLoginForm,
   goToAdminDashboard
} from '../../../Common/utils/NavigationUtils'

import EditForm from '../../components/EditForm'
import AuthStore from '../../../Authentication/stores/AuthStore'
import FormStore from '../../stores/FormStore'

interface EditFormRouteProps extends RouteComponentProps {}

interface InjectedProps extends EditFormRouteProps {
   authStore: AuthStore
   formStore: FormStore
}

@inject('authStore', 'formStore')
@observer
class EditFormRoute extends React.Component<EditFormRouteProps> {
   componentDidMount() {
      const { getFormQuestions } = this.getInjectedProps().formStore
      getFormQuestions(this.getFormId())
   }

   getInjectedProps = () => {
      const props = this.props as InjectedProps
      return { formStore: props.formStore, authStore: props.authStore }
   }

   getFormId = (): number => {
      return this.props.match.params.form_id
   }

   onClickLogout = (): void => {
      const { onSignOut } = this.getInjectedProps().authStore
      const { history } = this.props
      onSignOut()
      goToLoginForm(history)
   }

   onNavigateBack = (): void => {
      const { history } = this.props
      goToAdminDashboard(history)
   }

   renderSuccessUI = (): React.ReactNode => {
      const { currentForm } = this.getInjectedProps().formStore
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
      } = this.getInjectedProps().formStore
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
