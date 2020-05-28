import React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import strings from '../../i18n/strings.json'
import {
   FormNamePopupWrapper,
   FormNamePopupContainer,
   Caption,
   NameInput,
   ContinueButton
} from './styledComponents'

type FormNamePopupProps = {
   onClickContinue: (name) => void
   caption: string
}

const { empty, namePlaceholder } = strings.popup
@observer
class FormNamePopup extends React.Component<FormNamePopupProps> {
   @observable name: string = empty
   @action.bound
   onChangeName(e) {
      this.name = e.target.value
   }
   onClickContinue = () => {
      const { onClickContinue } = this.props
      onClickContinue(this.name)
   }
   render() {
      const { caption } = this.props
      return (
         <FormNamePopupWrapper>
            <FormNamePopupContainer>
               <Caption>{caption}</Caption>
               <NameInput
                  onChange={this.onChangeName}
                  placeholder={namePlaceholder}
                  value={this.name}
               />
               <ContinueButton
                  disabled={this.name === empty}
                  onClick={this.onClickContinue}
               >
                  Continue
               </ContinueButton>
            </FormNamePopupContainer>
         </FormNamePopupWrapper>
      )
   }
}

export { FormNamePopup }
