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
   formId: number
   onNavigateBack: () => void
}

@observer
class EditForm extends React.Component<EditFormProps> {
   render() {
      const { onClickLogout, onNavigateBack, formId } = this.props
      const { questionStore, name, onPublishForm } = this.props.formDetails
      return (
         <FormScreenUIWrapper>
            <FormHeader
               onClickLogout={onClickLogout}
               onClickPreview={() => {}}
               onNavigateBack={onNavigateBack}
               name={name}
               onClickPublish={() => onPublishForm(formId)}
            />
            <FormDetails>
               <QuestionList questionStore={questionStore} />
               <FormPreviewWrapper>
                  <FormPreview questions={questionStore.questionsList} />
               </FormPreviewWrapper>
            </FormDetails>
         </FormScreenUIWrapper>
      )
   }
}

export { EditForm }
