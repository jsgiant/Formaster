import React from 'react'
import { MdSettings } from 'react-icons/md'
import { FaRegImage } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import strings from '../../i18n/form-strings.json'
import {
   QuestionWrapper,
   DescriptionText,
   Toolbar,
   IconContainer,
   Required
} from './styledComponents'

import WelcomeScreen from './WelcomeScreen'
import ThankyouScreen from './ThankYouScreen'
import ShortText from './ShortText'
import LargeText from './LargeText'
import McqQuestion from './Mcq'

type QuestionProps = {
   question: any
   onDeleteQuestion: (question) => void
}

class Question extends React.Component<QuestionProps> {
   onChangeTitle = e => {
      const { onChangeTitle } = this.props.question
      onChangeTitle(e.target.value)
   }

   onChangeDescription = e => {
      const { onChangeDescription } = this.props.question
      onChangeDescription(e.target.value)
   }

   onAddOrRemoveChoice = e => {
      const { onAddOrRemoveChoice } = this.props.question
      onAddOrRemoveChoice(e.keyCode, e.target.tabIndex, e.target.value)
   }

   onChangeChoiceText = e => {
      const { onChangeChoiceText } = this.props.question
      onChangeChoiceText(e.target.tabIndex, e.target.value)
   }

   renderQuestion = () => {
      const { title, type } = this.props.question
      switch (type) {
         case strings.welcome_screen:
            return (
               <WelcomeScreen onChangeText={this.onChangeTitle} text={title} />
            )
         case strings.thankyou_screen:
            return (
               <ThankyouScreen onChangeText={this.onChangeTitle} text={title} />
            )
         case strings.large_text:
            return <LargeText onChangeText={this.onChangeTitle} text={title} />

         case strings.mcq:
            const { mcqChoices } = this.props.question
            return (
               <McqQuestion
                  onChangeText={this.onChangeTitle}
                  onAddOrRemoveChoice={this.onAddOrRemoveChoice}
                  onChangeChoiceText={this.onChangeChoiceText}
                  text={title}
                  choices={mcqChoices}
               />
            )
         default:
            return <ShortText onChangeText={this.onChangeTitle} text={title} />
      }
   }

   render() {
      const { description, hasDescription, isRequired } = this.props.question
      const { question, onDeleteQuestion } = this.props
      return (
         <QuestionWrapper>
            {isRequired && <Required>*</Required>}
            {this.renderQuestion()}

            {!hasDescription && (
               <DescriptionText
                  onChange={this.onChangeDescription}
                  defaultValue={description}
                  placeholder={strings.description_placeholder}
               />
            )}
            <Toolbar>
               <IconContainer>
                  <MdSettings />
               </IconContainer>
               <IconContainer>
                  <FaRegImage />
               </IconContainer>
               <IconContainer onClick={() => onDeleteQuestion(question)}>
                  <MdDelete />
               </IconContainer>
            </Toolbar>
         </QuestionWrapper>
      )
   }
}
export { Question }
