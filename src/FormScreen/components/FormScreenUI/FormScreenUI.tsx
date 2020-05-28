import React from 'react'
import { observer } from 'mobx-react'
import { FormScreenUIWrapper } from './styledComponents'
import FormHeader from '../FormHeader'

type FormScreenUIProps = {
   onClickLogout: () => void
   onClickPreview: () => void
   formDetails: any
   onNavigateBack: () => void
}

@observer
class FormScreenUI extends React.Component<FormScreenUIProps> {
   render() {
      const { onClickLogout, onNavigateBack } = this.props
      return (
         <FormScreenUIWrapper>
            <FormHeader
               onClickLogout={onClickLogout}
               onClickPreview={() => {}}
               onNavigateBack={onNavigateBack}
               name='form'
               onClickPublish={() => {}}
            />
         </FormScreenUIWrapper>
      )
   }
}

export { FormScreenUI }
