import React from 'react'
import { reaction, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { API_SUCCESS, API_FETCHING } from '@ib/api-constants'
import FormPreview from '../../../Common/components/FormPreview'
import strings from './../../i18n/form-strings.json'
import FormHeader from '../FormHeader'
import QuestionList from '../QuestionList'
import {
   FormScreenUIWrapper,
   FormDetails,
   FormPreviewWrapper
} from './styledComponents'

type EditFormProps = {
   onClickLogout: () => void
   onClickPreview: () => void
   formDetails: any
   formId: number
   onNavigateBack: () => void
}

@observer
class EditForm extends React.Component<EditFormProps> {
   @observable selectedQuestion: number = 0
   onNavigateBack = () => {
      const { formId, onNavigateBack } = this.props
      const { onPublishForm } = this.props.formDetails
      if (confirm(strings.confirmMessage)) {
         onPublishForm(formId)
         onNavigateBack()
      }
   }

   @action.bound
   onChangeSelectedQuestion(questionNumber) {
      this.selectedQuestion = questionNumber
   }

   reaction = reaction(
      () => {
         const { postQuestionsAPIStatus } = this.props.formDetails
         return postQuestionsAPIStatus === API_SUCCESS
      },
      isSuccess => {
         this.props.onNavigateBack()
      }
   )

   onPublish = formId => {
      const { onNavigateBack } = this.props
      const { onPublishForm } = this.props.formDetails
      onPublishForm(formId)
   }

   render() {
      const { onClickLogout, formId } = this.props
      const {
         questionStore,
         name,
         postQuestionsAPIStatus
      } = this.props.formDetails
      const isPublishing = postQuestionsAPIStatus === API_FETCHING
      return (
         <FormScreenUIWrapper>
            <FormHeader
               isPublishing={isPublishing}
               onClickLogout={onClickLogout}
               onClickPreview={() => {}}
               onNavigateBack={this.onNavigateBack}
               name={name}
               onClickPublish={() => this.onPublish(formId)}
            />
            <FormDetails>
               <QuestionList
                  onChangeSelectedQuestion={this.onChangeSelectedQuestion}
                  questionStore={questionStore}
               />
               <FormPreviewWrapper>
                  <FormPreview
                     selectedQuestion={this.selectedQuestion}
                     questions={questionStore.questionsList}
                  />
               </FormPreviewWrapper>
            </FormDetails>
         </FormScreenUIWrapper>
      )
   }
}

export { EditForm }
