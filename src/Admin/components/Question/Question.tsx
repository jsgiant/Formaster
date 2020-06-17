import React from 'react'
import { observer } from 'mobx-react'
import { MdSettings } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import strings from '../../i18n/form-strings.json'
import {
   QuestionWrapper,
   DescriptionText,
   Toolbar,
   IconContainer,
   Required,
   RequiredToggler
} from './styledComponents'

import WelcomeScreen from './WelcomeScreen'
import ThankyouScreen from './ThankYouScreen'
import ShortText from './ShortText'
import LargeText from './LargeText'
import McqQuestion from './Mcq'

type QuestionProps = {
   question: any
   onDeleteQuestion: (question) => void
   onSelectQuestion: (number) => void
   number: number
}

@observer
class Question extends React.Component<QuestionProps> {
   onChangeTitle = e => {
      const { onChangeTitle } = this.props.question
      this.onSelectQuestion()
      onChangeTitle(e.target.value)
   }

   onSelectQuestion = () => {
      const { number, onSelectQuestion } = this.props
      onSelectQuestion(number)
   }
   onChangeDescription = e => {
      const { onChangeDescription } = this.props.question
      this.onSelectQuestion()
      onChangeDescription(e.target.value)
   }

   onAddOrRemoveChoice = e => {
      const keyCode = e.keyCode
      const { onAddChoice, onRemoveChoice } = this.props.question
      this.onSelectQuestion()
      if (keyCode === 13 && e.target.value !== '') {
         onAddChoice()
      } else if (e.target.value === '' && keyCode === 8) {
         onRemoveChoice(e.target.tabIndex)
      }
   }

   onChangeChoiceText = e => {
      const { onChangeChoiceText } = this.props.question
      const { number, onSelectQuestion } = this.props
      onSelectQuestion(number)
      onChangeChoiceText(e.target.tabIndex, e.target.value)
   }

   renderQuestion = () => {
      const { questionTitle, questionId, type } = this.props.question

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

   renderToolbar = () => {
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
