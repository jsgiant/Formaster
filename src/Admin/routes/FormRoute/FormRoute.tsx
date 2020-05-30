import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import { LOGIN_PATH } from '../../../Authentication/constants/Paths'
import { paths } from '../../../Common/constants/Paths'
import FormScreenUI from '../../components/EditForm'

type FormScreenRouteProps = {
   authStore: any
   formStore: any
   history: any
   match: any
}

@inject('authStore', 'formStore')
@observer
class FormRoute extends React.Component<FormScreenRouteProps> {
   @observable formId

   componentDidMount() {
      const { getFormQuestions } = this.props.formStore
      this.formId = this.props.match.params.form_id
      getFormQuestions(this.formId)
   }

   onClickLogout = () => {
      const { onSignOut } = this.props.authStore
      const { history } = this.props
      onSignOut()
      history.replace(LOGIN_PATH)
   }

   onNavigateBack = () => {
      const { history } = this.props
      history.replace(paths.dashboard)
   }

   renderSuccessUI = () => {
      const { currentForm } = this.props.formStore
      return (
         <FormScreenUI
            onClickLogout={this.onClickLogout}
            onClickPreview={() => {}}
            onNavigateBack={this.onNavigateBack}
            formDetails={currentForm}
         />
      )
   }

   render() {
      const {
         getQuestionsAPIStatus,
         getQuestionsAPIError,
         getFormQuestions
      } = this.props.formStore
      return (
         <LoadingWrapperWithFailure
            apiStatus={getQuestionsAPIStatus}
            apiError={getQuestionsAPIError}
            onRetryClick={() => getFormQuestions(this.formId)}
            renderSuccessUI={this.renderSuccessUI}
         />
      )
   }
}

export { FormRoute }
