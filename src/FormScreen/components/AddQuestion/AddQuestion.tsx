import React from 'react'
import strings from './../../i18n/strings.json'
import {
   AddQuestionWrapper,
   AddQuestionButton,
   AddLabel
} from './styledComponents'

type AddQuestionProps = {
   onAddQuestion: () => void
}
class AddQuestion extends React.Component {
   render() {
      return (
         <AddQuestionWrapper>
            <AddQuestionButton>+</AddQuestionButton>
            <AddLabel>{strings.add_question}</AddLabel>
         </AddQuestionWrapper>
      )
   }
}

export { AddQuestion }
