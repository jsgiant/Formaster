import React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import strings from './../../i18n/strings.json'

import NoDataView from '../NoDataView'

import {
   FormPreviewContainer,
   PaginationButtons,
   PaginationContainer,
   FieldWrapper,
   NavigationButton
} from './styledComponents'
import ShortTextQuestionPreview from './ShortTextQuestionPreview'
import LongTextQuestionPreview from './LongTextQuestionPreview'
import EndCardsPreview from './EndCardsPreview'
import McqPreview from './McqPreview'

type FormPreviewProps = {
   questions: any
   onSubmitResponses?: () => void
}

@observer
class FormPreview extends React.Component<FormPreviewProps> {
   @observable currentQuestion: number = 0
   questionNumber: number = 0

   @action.bound
   navigateToPreviousQuestion() {
      if (this.currentQuestion > 1) {
         --this.currentQuestion
         --this.questionNumber
      }
   }
   @action.bound
   navigateToNextQuestion() {
      const { questions } = this.props
      if (this.currentQuestion !== questions.length - 2) {
         ++this.currentQuestion
         ++this.questionNumber
      }
   }

   @action.bound
   onSubmit() {
      const { onSubmitResponses } = this.props
      if (onSubmitResponses) {
         onSubmitResponses()
      } else {
         alert('thankyou!')
      }
   }

   onClickEnterKey = e => {
      e.keyCode === 13 && this.navigateToNextQuestion()
   }

   renderQuestions = () => {
      const { questions } = this.props
      const isFinalQuestion = this.currentQuestion === questions.length - 2
      if (questions.length === 0) {
         return <NoDataView />
      }
      switch (questions[this.currentQuestion].type) {
         case strings.short_text:
            return (
               <ShortTextQuestionPreview
                  questionNumber={this.questionNumber}
                  onClickEnterKey={this.onClickEnterKey}
                  navigateToNext={this.navigateToNextQuestion}
                  question={questions[this.currentQuestion]}
                  isFinalQuestion={isFinalQuestion}
                  onSubmit={this.onSubmit}
               />
            )
         case strings.large_text:
            return (
               <LongTextQuestionPreview
                  questionNumber={this.questionNumber}
                  navigateToNext={this.navigateToNextQuestion}
                  onClickEnterKey={this.onClickEnterKey}
                  question={questions[this.currentQuestion]}
                  isFinalQuestion={isFinalQuestion}
                  onSubmit={this.onSubmit}
               />
            )
         case strings.mcq:
            return (
               <McqPreview
                  questionNumber={this.questionNumber}
                  question={questions[this.currentQuestion]}
                  navigateToNext={this.navigateToNextQuestion}
                  isFinalQuestion={isFinalQuestion}
                  onSubmit={this.onSubmit}
               />
            )
         default:
            return (
               <EndCardsPreview
                  navigateToNext={this.navigateToNextQuestion}
                  question={questions[this.currentQuestion]}
               />
            )
      }
   }

   render() {
      const { questions } = this.props
      const isUpArrowDisabled = this.questionNumber <= 1
      const isDownArrowDisabled = this.questionNumber >= questions.length - 2
      return (
         <FormPreviewContainer>
            <FieldWrapper>{this.renderQuestions()}</FieldWrapper>
            <PaginationContainer>
               <PaginationButtons>
                  <NavigationButton
                     isDisabled={isUpArrowDisabled}
                     onClick={this.navigateToPreviousQuestion}
                  >
                     <IoIosArrowUp />
                  </NavigationButton>
                  <NavigationButton
                     isDisabled={isDownArrowDisabled}
                     onClick={this.navigateToNextQuestion}
                  >
                     <IoIosArrowDown />
                  </NavigationButton>
               </PaginationButtons>
            </PaginationContainer>
         </FormPreviewContainer>
      )
   }
}

export { FormPreview }
