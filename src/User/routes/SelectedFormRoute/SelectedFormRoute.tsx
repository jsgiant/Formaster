import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import FormPreview from '../../../Common/components/FormPreview'

@inject('userFormStore')
@observer
class SelectedFormRoute extends Component {
   formId
   componentDidMount() {
      // const { getFormQuestions } = this.props.formStore
      // this.formId = this.props.match.params.form_id
      // getFormQuestions(this.formId)
   }

   render() {
      return <div>Selectedform</div>
   }
}

export { SelectedFormRoute }
