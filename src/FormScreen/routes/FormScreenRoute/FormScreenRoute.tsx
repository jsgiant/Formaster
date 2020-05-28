import React from 'react'
import { observer, inject } from 'mobx-react'
import FormScreenUI from '../../components/FormScreenUI'
import { LOGIN_PATH } from '../../../Authentication/constants/Paths'
import { paths } from '../../../constants/Paths'

type FormScreenRouteProps = {
   authStore: any
   formStore: any
   history: any
}

@inject('authStore', 'formStore')
@observer
class FormScreenRoute extends React.Component<FormScreenRouteProps> {
   onClickLogout = () => {
      const { onSignOut } = this.props.authStore
      const { history } = this.props
      onSignOut()
      history.push(LOGIN_PATH)
   }

   onNavigateBack = () => {
      const { history } = this.props
      history.push(paths.dashboard)
   }
   render() {
      return (
         <FormScreenUI
            onClickLogout={this.onClickLogout}
            onClickPreview={() => {}}
            onNavigateBack={this.onNavigateBack}
            formDetails={null}
         />
      )
   }
}

export { FormScreenRoute }
