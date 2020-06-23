import React from 'react'
import { observer } from 'mobx-react'

import QuestionStore from '../../stores/QuestionStore'

import Question from '../Question'
import AddQuestion from '../AddQuestion'

import { QuestionListWrapper } from './styledComponents'

type QuestionListProps = {
   questionStore: QuestionStore
   onChangeSelectedQuestion: (questionNumber: number) => void
}

@observer
class QuestionList extends React.Component<QuestionListProps> {
   renderQuestionList = (): React.ReactNode => {
      const { questionsList, onDeleteQuestion } = this.props.questionStore
      const { onChangeSelectedQuestion } = this.props
      return questionsList.map((question, index) => {
         return (
            <Question
               key={Math.random()}
               onDeleteQuestion={onDeleteQuestion}
               question={question}
               questionNumber={index}
               onSelectQuestion={onChangeSelectedQuestion}
            />
         )
      })
   }
   onAddQuestion = (type: string): void => {
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
