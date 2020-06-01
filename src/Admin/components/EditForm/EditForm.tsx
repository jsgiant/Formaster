import React from 'react'
import { observer } from 'mobx-react'
import FormPreview from '../../../Common/components/FormPreview'
import FormHeader from '../FormHeader'
import QuestionList from '../QuestionList'
import {
   FormScreenUIWrapper,
   FormDetails,
   FormPreviewWrapper
} from './styledComponents'

type EditFormProps = {
   onClickLogout: () => void
   onClickPreview: () => void
   formDetails: any
   onNavigateBack: () => void
}

@observer
class EditForm extends React.Component<EditFormProps> {
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
            <FormDetails>
               <QuestionList questionStore={formDetails.questionStore} />
               <FormPreviewWrapper>
                  <FormPreview
                     questions={formDetails.questionStore.questionsList}
                  />
               </FormPreviewWrapper>
            </FormDetails>
         </FormScreenUIWrapper>
      )
   }
}

export { EditForm }
