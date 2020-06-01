import React from 'react'
import { withRouter } from 'react-router-dom'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import { LOGIN_PATH } from '../../../Authentication/constants/Paths'
import { paths } from '../../../Common/constants/Paths'
import EditForm from '../../components/EditForm'

type EditFormRouteProps = {
   authStore: any
   formStore: any
   history: any
   match: any
}

@inject('authStore', 'formStore')
@observer
class EditFormRoute extends React.Component<EditFormRouteProps> {
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
         <EditForm
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

export default withRouter(EditFormRoute)
