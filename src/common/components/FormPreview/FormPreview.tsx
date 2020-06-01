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
}

@observer
class FormPreview extends React.Component<FormPreviewProps> {
   @observable currentQuestion: number = 0
   questionNumber: number = 1

   @action.bound
   navigateToPreviousQuestion() {
      if (this.currentQuestion !== 0) {
         --this.currentQuestion
         --this.questionNumber
      }
   }

   @action.bound
   navigateToNextQuestion() {
      const { questions } = this.props
      if (this.currentQuestion !== questions.length - 1) {
         ++this.currentQuestion
         ++this.questionNumber
      }
   }

   onClickEnterKey = e => {
      e.keyCode === 13 && this.navigateToNextQuestion()
   }

   renderQuestions = () => {
      const { questions } = this.props
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
               />
            )
         case strings.large_text:
            return (
               <LongTextQuestionPreview
                  questionNumber={this.questionNumber}
                  navigateToNext={this.navigateToNextQuestion}
                  onClickEnterKey={this.onClickEnterKey}
                  question={questions[this.currentQuestion]}
               />
            )
         case strings.mcq:
            return (
               <McqPreview
                  questionNumber={this.questionNumber}
                  question={questions[this.currentQuestion]}
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
      return (
         <FormPreviewContainer>
            <FieldWrapper>{this.renderQuestions()}</FieldWrapper>
            <PaginationContainer>
               <PaginationButtons>
                  <NavigationButton onClick={this.navigateToPreviousQuestion}>
                     <IoIosArrowUp />
                  </NavigationButton>
                  <NavigationButton onClick={this.navigateToNextQuestion}>
                     <IoIosArrowDown />
                  </NavigationButton>
               </PaginationButtons>
            </PaginationContainer>
         </FormPreviewContainer>
      )
   }
}

export { FormPreview }
