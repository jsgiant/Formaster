import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { reaction } from 'mobx'
import { API_SUCCESS } from '@ib/api-constants'

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import FormPreview from '../../../Common/components/FormPreview'

import UserFormStore from '../../stores/UserFormStore'

import { UserFormContainer } from './styledComponents'
import { goToUserDashboard } from '../../../Common/utils/NavigationUtils'

interface SelectedFormRouteProps extends RouteComponentProps {}

interface InjectedProps extends SelectedFormRouteProps {
   userFormStore: UserFormStore
}

@inject('userFormStore')
@observer
class SelectedFormRoute extends Component<SelectedFormRouteProps> {
   componentDidMount() {
      this.getQuestions()
   }

   getUserFormStore = () => {
      const props = this.props as InjectedProps
      return props.userFormStore
   }

   getFormId = (): number => {
      return this.props.match.params.form_id
   }
   getQuestions = (): void => {
      const { getSelectedFormQuestions } = this.getUserFormStore()
      getSelectedFormQuestions(this.getFormId())
   }

   reaction = reaction(
      () => {
         if (this.getUserFormStore().selectedForm) {
            const {
               postResponsesAPIStatus
            } = this.getUserFormStore().selectedForm
            return postResponsesAPIStatus === API_SUCCESS
         }
      },
      isSuccess => {
         if (isSuccess) {
            goToUserDashboard(this.props.history)
         }
      }
   )

   onSubmitForm = (): void => {
      const { postSubmittedResponses } = this.getUserFormStore().selectedForm
      postSubmittedResponses(this.getFormId())
   }

   renderUserForm = (): any => {
      const { questionsList } = this.getUserFormStore().selectedForm
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
      } = this.getUserFormStore()
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
