import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import FormPreview from '../../../Common/components/FormPreview'
import { UserFormContainer } from './styledComponents'

type SelectedFormRouteProps = {
   userFormStore: any
   match: any
}

@inject('userFormStore')
@observer
class SelectedFormRoute extends Component<SelectedFormRouteProps> {
   componentDidMount() {
      this.getQuestions()
   }

   getQuestions = (): void => {
      const { getSelectedFormQuestions } = this.props.userFormStore
      const formId = this.props.match.params.form_id
      getSelectedFormQuestions(formId)
   }

   onSubmitForm = (): void => {
      const { postSubmittedResponses } = this.props.userFormStore.selectedForm
      postSubmittedResponses()
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

export { SelectedFormRoute }
