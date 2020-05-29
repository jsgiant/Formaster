import React from 'react'
import { observer, inject } from 'mobx-react'
import FormScreenUI from '../../components/FormUI'
import formsData from '../../fixtures/forms-data.json'
import { LOGIN_PATH } from '../../../Authentication/constants/Paths'
import { paths } from '../../../common/constants/Paths'
import FormModel from '../../stores/Models/FormModel'

type FormScreenRouteProps = {
   authStore: any
   formStore: any
   history: any
}

@inject('authStore', 'formStore')
@observer
class FormRoute extends React.Component<FormScreenRouteProps> {
   onClickLogout = () => {
      const { onSignOut } = this.props.authStore
      const { history } = this.props
      onSignOut()
      history.replace(LOGIN_PATH)
   }

   onNavigateBack = () => {
      const { history } = this.props
      history.replace(paths.dashboard)
   }
   render() {
      return (
         <FormScreenUI
            onClickLogout={this.onClickLogout}
            onClickPreview={() => {}}
            onNavigateBack={this.onNavigateBack}
            formDetails={new FormModel(formsData.forms[1])}
         />
      )
   }
}

export { FormRoute }
