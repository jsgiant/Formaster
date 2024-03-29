import React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

import strings from '../../i18n/strings.json'

import {
   FormNamePopupWrapper,
   FormNamePopupContainer,
   Caption,
   NameInput,
   ContinueButton,
   CancelButton
} from './styledComponents'

type FormNameDialogProps = {
   onClickContinue: (name: string) => void
   caption: string
   isProcessing: boolean
   defaultValue: string
   onShowOrHideDialog: () => void
}

const { empty, namePlaceholder } = strings.popup
@observer
class FormNameDialog extends React.Component<FormNameDialogProps> {
   @observable name: string = this.props.defaultValue

   @action.bound
   onChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
      this.name = e.target.value
   }

   @action.bound
   onClickContinue(): void {
      const { onClickContinue } = this.props
      onClickContinue(this.name)
   }

   isContinueDisabled(): boolean {
      return this.name === empty || this.props.isProcessing
   }

   render() {
      const { caption, onShowOrHideDialog } = this.props
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
                  disabled={this.isContinueDisabled()}
                  isDisabled={this.isContinueDisabled()}
                  onClick={this.onClickContinue}
               >
                  Continue
               </ContinueButton>
               <CancelButton onClick={onShowOrHideDialog}>Cancel</CancelButton>
            </FormNamePopupContainer>
         </FormNamePopupWrapper>
      )
   }
}

export { FormNameDialog }
