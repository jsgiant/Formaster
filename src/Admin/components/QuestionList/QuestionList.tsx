import React from 'react'
import { observer } from 'mobx-react'
import Question from '../Question'
import AddQuestion from '../AddQuestion'
import { QuestionListWrapper } from './styledComponents'

type QuestionListProps = {
   questionStore: any
   onChangeSelectedQuestion: (questionNumber) => void
}

@observer
class QuestionList extends React.Component<QuestionListProps> {
   renderQuestionList = () => {
      const { questionsList, onDeleteQuestion } = this.props.questionStore
      const { onChangeSelectedQuestion } = this.props
      return questionsList.map((question, index) => {
         return (
            <Question
               key={Math.random()}
               onDeleteQuestion={onDeleteQuestion}
               question={question}
               number={index}
               onSelectQuestion={onChangeSelectedQuestion}
            />
         )
      })
   }
   onAddQuestion = type => {
      const { onAddQuestion } = this.props.questionStore
      onAddQuestion(type)
   }

   render() {
      return (
         <QuestionListWrapper>
            {this.renderQuestionList()}
            <AddQuestion onAddQuestion={this.onAddQuestion} />
         </QuestionListWrapper>
      )
   }
}

export { QuestionList }
