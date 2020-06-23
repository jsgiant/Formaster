import React from 'react'
import { observer } from 'mobx-react'

import strings from '../../i18n/form-strings.json'
import QuestionModel from '../../stores/models/QuestionModel'
import McqModel from '../../stores/models/QuestionModel/McqModel'

import WelcomeScreen from './WelcomeScreen'
import ThankyouScreen from './ThankYouScreen'
import ShortText from './ShortText'
import LargeText from './LargeText'
import McqQuestion from './Mcq'

import {
   QuestionWrapper,
   DescriptionText,
   Toolbar,
   Required,
   RequiredToggler
} from './styledComponents'

type QuestionProps = {
   question: any
   onDeleteQuestion: (question: QuestionModel | McqModel) => void
   onSelectQuestion: (questionNumber: number) => void
   questionNumber: number
}

@observer
class Question extends React.Component<QuestionProps> {
   onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { onChangeTitle } = this.props.question
      this.onSelectQuestion()
      onChangeTitle(e.target.value)
   }

   onSelectQuestion = () => {
      const { questionNumber, onSelectQuestion } = this.props
      onSelectQuestion(questionNumber)
   }
   onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { onChangeDescription } = this.props.question
      this.onSelectQuestion()
      onChangeDescription(e.target.value)
   }

   onAddOrRemoveChoice = (e: any): void => {
      const keyCode = e.keyCode
      const { onAddChoice, onRemoveChoice } = this.props.question
      this.onSelectQuestion()
      if (keyCode === 13 && e.target.value !== '') {
         onAddChoice()
      } else if (e.target.value === '' && keyCode === 8) {
         onRemoveChoice(e.target.tabIndex)
      }
   }

   onChangeChoiceText = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { onChangeChoiceText } = this.props.question
      const { questionNumber, onSelectQuestion } = this.props
      onSelectQuestion(questionNumber)
      onChangeChoiceText(e.target.tabIndex, e.target.value)
   }

   renderQuestion = (): React.ReactNode => {
      const { questionTitle, type } = this.props.question

      switch (type) {
         case strings.welcome_screen:
            return (
               <WelcomeScreen
                  onChangeText={this.onChangeTitle}
                  text={questionTitle}
               />
            )
         case strings.thankyou_screen:
            return (
               <ThankyouScreen
                  onChangeText={this.onChangeTitle}
                  text={questionTitle}
               />
            )
         case strings.large_text:
            return (
               <LargeText
                  onChangeText={this.onChangeTitle}
                  text={questionTitle}
               />
            )

         case strings.mcq:
            const { mcqChoices } = this.props.question

            return (
               <McqQuestion
                  onChangeText={this.onChangeTitle}
                  onAddOrRemoveChoice={this.onAddOrRemoveChoice}
                  onChangeChoiceText={this.onChangeChoiceText}
                  text={questionTitle}
                  choices={mcqChoices}
               />
            )
         default:
            return (
               <ShortText
                  onChangeText={this.onChangeTitle}
                  text={questionTitle}
               />
            )
      }
   }

   renderToolbar = (): React.ReactNode => {
      const { type, onChangeIsRequired, isRequired } = this.props.question
      return (
         type !== strings.thankyou_screen &&
         type !== strings.welcome_screen && (
            <Toolbar>
               <RequiredToggler
                  type='checkbox'
                  checked={isRequired}
                  onChange={onChangeIsRequired}
               />
               Required
            </Toolbar>
         )
      )
   }

   render() {
      const { description, isRequired } = this.props.question
      return (
         <QuestionWrapper
            data-testid='test-question'
            onFocus={this.onSelectQuestion}
         >
            {isRequired && <Required>*</Required>}
            {this.renderQuestion()}

            <DescriptionText
               onChange={this.onChangeDescription}
               defaultValue={description}
               placeholder={strings.description_placeholder}
            />
            {this.renderToolbar()}
         </QuestionWrapper>
      )
   }
}
export { Question }
