import React from 'react'
import Question from '../Question'
import AddQuestion from '../AddQuestion'
import { QuestionListWrapper } from './styledComponents'
import { observer } from 'mobx-react'

type QuestionListProps = {
   questionStore: any
}

@observer
class QuestionList extends React.Component<QuestionListProps> {
   renderQuestionList = () => {
      const { questionsList, onDeleteQuestion } = this.props.questionStore
      console.log(onDeleteQuestion)
      return questionsList.map(question => {
         return (
            <Question
               key={question.id}
               onDeleteQuestion={onDeleteQuestion}
               question={question}
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
