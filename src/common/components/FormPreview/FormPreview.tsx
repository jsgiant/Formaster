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
import ScreenPreview from './ScreenPreview'
import McqPreview from './McqPreview'

type FormPreviewProps = {
   questions: any
}

@observer
class FormPreview extends React.Component<FormPreviewProps> {
   @observable currentQuestion: number = 0

   @action.bound
   navigateToPreviousAction() {
      if (this.currentQuestion !== 0) {
         --this.currentQuestion
      }
   }

   @action.bound
   navigateToNextQuestion() {
      const { questions } = this.props
      if (this.currentQuestion !== questions.length - 1) {
         ++this.currentQuestion
      }
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
                  question={questions[this.currentQuestion]}
               />
            )
         case strings.large_text:
            return (
               <LongTextQuestionPreview
                  question={questions[this.currentQuestion]}
               />
            )
         case strings.mcq:
            return <McqPreview question={questions[this.currentQuestion]} />
         default:
            return <ScreenPreview question={questions[this.currentQuestion]} />
      }
   }

   render() {
      const { questions } = this.props
      return (
         <FormPreviewContainer>
            <FieldWrapper>{this.renderQuestions()}</FieldWrapper>
            <PaginationContainer>
               <PaginationButtons>
                  <NavigationButton onClick={this.navigateToPreviousAction}>
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
