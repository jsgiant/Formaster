import React from 'react'
import { observer } from 'mobx-react'
import { observable, action, reaction } from 'mobx'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { Line } from 'rc-progress'

import strings from './../../i18n/strings.json'

import NoDataView from '../NoDataView'

import {
   FormPreviewContainer,
   PaginationButtons,
   PaginationContainer,
   FieldWrapper,
   NavigationButton,
   ProgressBar
} from './styledComponents'
import ShortTextQuestionPreview from './ShortTextQuestionPreview'
import LongTextQuestionPreview from './LongTextQuestionPreview'
import EndCardsPreview from './EndCardsPreview'
import McqPreview from './McqPreview'

type FormPreviewProps = {
   questions: any
   selectedQuestion?: number
   onSubmitResponses?: () => void
}

@observer
class FormPreview extends React.Component<FormPreviewProps> {
   @observable currentQuestion: number = 0
   questionNumber: number = 0

   @action.bound
   navigateToPreviousQuestion() {
      if (this.currentQuestion > 0) {
         --this.currentQuestion
         --this.questionNumber
      }
   }

   @action.bound
   navigateToSelectedQuestion(questionNumber) {
      this.currentQuestion = questionNumber
   }
   reaction = reaction(
      () => {
         return this.props.selectedQuestion
      },
      currentQuestion => {
         this.navigateToSelectedQuestion(currentQuestion)
      }
   )
   @action.bound
   navigateToNextQuestion() {
      const { questions } = this.props
      if (this.currentQuestion !== questions.length - 1) {
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
      let finalQuestion = questions.length - 1
      const isFinalQuestion = this.currentQuestion === finalQuestion
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
                  onSubmit={this.onSubmit}
               />
            )
      }
   }

   isArrowDisabled = (arrow): boolean => {
      const { questions } = this.props
      if (arrow === strings.downArrow) {
         return this.questionNumber >= questions.length - 1
      }
      return this.questionNumber === 0
   }

   render() {
      const isUpArrowDisabled = this.isArrowDisabled(strings.upArrow)
      const isDownArrowDisabled = this.isArrowDisabled(strings.downArrow)
      return (
         <FormPreviewContainer>
            <FieldWrapper>{this.renderQuestions()}</FieldWrapper>
            <PaginationContainer>
               {/* <ProgressBar>
                  progress
                  <Line percent={50} strokeWidth={2} strokeColor='#4fd1c5' />
               </ProgressBar> */}
               <PaginationButtons>
                  <NavigationButton
                     disabled={isUpArrowDisabled}
                     isDisabled={isUpArrowDisabled}
                     onClick={this.navigateToPreviousQuestion}
                  >
                     <IoIosArrowUp />
                  </NavigationButton>
                  <NavigationButton
                     disabled={isDownArrowDisabled}
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
