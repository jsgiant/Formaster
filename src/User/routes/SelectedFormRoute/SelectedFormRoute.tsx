import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { reaction } from 'mobx'
import { API_SUCCESS } from '@ib/api-constants'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import FormPreview from '../../../Common/components/FormPreview'
import { UserFormContainer } from './styledComponents'

type SelectedFormRouteProps = {
   userFormStore: any
   match: any
   history: any
}

@inject('userFormStore')
@observer
class SelectedFormRoute extends Component<SelectedFormRouteProps> {
   componentDidMount() {
      this.getQuestions()
   }

   getFormId = (): number => {
      return this.props.match.params.form_id
   }
   getQuestions = (): void => {
      const { getSelectedFormQuestions } = this.props.userFormStore
      getSelectedFormQuestions(this.getFormId())
   }

   reaction = reaction(
      () => {
         if (this.props.userFormStore.selectedForm) {
            const {
               postResponsesAPIStatus
            } = this.props.userFormStore.selectedForm
            return postResponsesAPIStatus === API_SUCCESS
         }
      },
      isSuccess => {
         if (isSuccess) {
            this.props.history.replace('/user/dashboard/')
         }
      }
   )

   onSubmitForm = (): void => {
      const { postSubmittedResponses } = this.props.userFormStore.selectedForm
      postSubmittedResponses(this.getFormId())
   }

   renderUserForm = (): any => {
      const { questionsList } = this.props.userFormStore.selectedForm
      return (
         <UserFormContainer>
            <FormPreview
               questions={questionsList}
               onSubmitResponses={this.onSubmitForm}
            />
         </UserFormContainer>
      )
   }

   render() {
      const {
         getQuestionsAPIStatus,
         getQuestionsAPIError
      } = this.props.userFormStore
      return (
         <LoadingWrapperWithFailure
            apiStatus={getQuestionsAPIStatus}
            apiError={getQuestionsAPIError}
            onRetryClick={this.getQuestions}
            renderSuccessUI={this.renderUserForm}
         />
      )
   }
}

export default withRouter(SelectedFormRoute)
