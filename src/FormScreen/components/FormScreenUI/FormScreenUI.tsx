import React from 'react'
import { observer } from 'mobx-react'
import { FormScreenUIWrapper } from './styledComponents'
import FormHeader from '../FormHeader'
import QuestionList from '../QuestionList'

type FormScreenUIProps = {
   onClickLogout: () => void
   onClickPreview: () => void
   formDetails: any
   onNavigateBack: () => void
}

@observer
class FormScreenUI extends React.Component<FormScreenUIProps> {
   render() {
      const { onClickLogout, onNavigateBack, formDetails } = this.props
      return (
         <FormScreenUIWrapper>
            <FormHeader
               onClickLogout={onClickLogout}
               onClickPreview={() => {}}
               onNavigateBack={onNavigateBack}
               name={formDetails.name}
               onClickPublish={() => {}}
            />
            <QuestionList questionStore={formDetails.questionStore} />
         </FormScreenUIWrapper>
      )
   }
}

export { FormScreenUI }
