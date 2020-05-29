import React from 'react'
import { MdSettings } from 'react-icons/md'
import { FaRegImage } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import strings from '../../i18n/form-strings.json'
import {
   QuestionWrapper,
   QuestionNumber,
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
   renderQuestion = () => {
      const { title, onChangeTitle, type } = this.props.question
      switch (type) {
         case strings.welcome_screen:
            return <WelcomeScreen onChangeText={onChangeTitle} text={title} />
         case strings.thankyou_screen:
            return <ThankyouScreen onChangeText={onChangeTitle} text={title} />
         case strings.large_text:
            return <LargeText onChangeText={onChangeTitle} text={title} />

         case strings.mcq:
            const {
               mcqChoices,
               onChangeChoiceText,
               onAddNewChoice
            } = this.props.question
            return (
               <McqQuestion
                  onChangeText={onChangeTitle}
                  onAddNewChoice={onAddNewChoice}
                  onChangeChoiceText={onChangeChoiceText}
                  text={title}
                  choices={mcqChoices}
               />
            )
         default:
            return <ShortText onChangeText={onChangeTitle} text={title} />
      }
   }

   render() {
      const {
         description,
         isRequired,
         hasDescription,
         onChangeDescription
      } = this.props.question
      const { question, onDeleteQuestion } = this.props
      return (
         <QuestionWrapper>
            {isRequired && <Required>*</Required>}
            {this.renderQuestion()}

            {hasDescription && (
               <DescriptionText
                  onChange={onChangeDescription}
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
