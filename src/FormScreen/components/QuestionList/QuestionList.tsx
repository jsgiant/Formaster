import React from 'react'
import Question from '../Question'
import AddQuestion from '../AddQuestion'
import { QuestionListWrapper } from './styledComponents'

type QuestionListProps = {
   questionStore: any
}

class QuestionList extends React.Component<QuestionListProps> {
   renderQuestionList = () => {
      const { questionsList } = this.props.questionStore
      return questionsList.map(question => {
         return <Question question={question} />
      })
   }
   render() {
      return (
         <QuestionListWrapper>
            {this.renderQuestionList()}
            <AddQuestion />
         </QuestionListWrapper>
      )
   }
}

export { QuestionList }
