import React from 'react'

type QuestionProps = {
   question: any
}

class Question extends React.Component<QuestionProps> {
   render() {
      console.log(this.props.question)
      return <div>Question</div>
   }
}
export { Question }
