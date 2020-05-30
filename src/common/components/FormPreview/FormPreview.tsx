import React from 'react'
import { observer } from 'mobx-react'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import strings from './../../i18n/strings.json'
import {
   FormPreviewContainer,
   FieldTitle,
   FieldNumber,
   FieldWrapper,
   FieldResponse,
   PaginationButtons,
   PaginationContainer,
   NavigationButton
} from './styledComponents'

type FormPreviewProps = {
   questions: Array<any>
}

@observer
class FormPreview extends React.Component<FormPreviewProps> {
   renderQuestions = () => {
      const { questions } = this.props
      return (
         <FieldWrapper>
            <FieldTitle>
               <FieldNumber>1.</FieldNumber>
               {questions[0].title}
            </FieldTitle>
            <FieldResponse placeholder={strings.response_placeholder} />
            <PaginationContainer>
               <PaginationButtons>
                  <NavigationButton>
                     <IoIosArrowUp />
                  </NavigationButton>
                  <NavigationButton>
                     <IoIosArrowDown />
                  </NavigationButton>
               </PaginationButtons>
            </PaginationContainer>
         </FieldWrapper>
      )
      //   return questions.map(question => (
      //      <FieldWrapper>
      //         <FieldTitle>{question.title}</FieldTitle>
      //      </FieldWrapper>
      //   ))
   }

   render() {
      return (
         <FormPreviewContainer>{this.renderQuestions()}</FormPreviewContainer>
      )
   }
}

export { FormPreview }
