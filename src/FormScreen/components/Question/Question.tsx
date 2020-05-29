import React from 'react'
import { MdSettings } from 'react-icons/md'
import { FaRegImage } from 'react-icons/fa'
import { MdMoreHoriz } from 'react-icons/md'
import strings from './../../i18n/strings.json'
import {
   QuestionWrapper,
   QuestionNumber,
   DescriptionText,
   Toolbar,
   IconContainer,
   Required
} from './styledComponents'
import QuestionText from './QuestionText'

type QuestionProps = {
   question: any
}

class Question extends React.Component<QuestionProps> {
   render() {
      const {
         id,
         title,
         description,
         isRequired,
         type,
         onChangeTitle,
         hasDescription,
         onChangeDescription
      } = this.props.question
      return (
         <QuestionWrapper>
            {isRequired && <Required>*</Required>}
            <QuestionNumber>{id}.</QuestionNumber>
            <QuestionText
               onChangeText={onChangeTitle}
               text={title}
               placeholder={
                  type !== 'welcome_screen'
                     ? strings.question_placeholder
                     : type !== 'thankyo_screen'
                     ? strings.welcome_placeholder
                     : strings.thankyou_placeholder
               }
            />
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
               <IconContainer>
                  <MdMoreHoriz />
               </IconContainer>
            </Toolbar>
         </QuestionWrapper>
      )
   }
}
export { Question }
