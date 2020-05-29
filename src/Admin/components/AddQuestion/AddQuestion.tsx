import React from 'react'
import {
   Menu,
   MenuList,
   MenuButton,
   MenuItem,
   MenuItems
} from '@reach/menu-button'
import '@reach/menu-button/styles.css'
import strings from './../../i18n/strings.json'
import formString from './../../i18n/form-strings.json'
import {
   AddQuestionWrapper,
   AddQuestionButton,
   AddLabel
} from './styledComponents'

type AddQuestionProps = {
   onAddQuestion: (type) => void
}

class AddQuestion extends React.Component<AddQuestionProps> {
   renderMenuOptions = () => {
      const { onAddQuestion } = this.props
      return strings.question_options.map(option => {
         return (
            <MenuItem
               key={option.type}
               onSelect={() => onAddQuestion(option.type)}
            >
               {option.title}
            </MenuItem>
         )
      })
   }

   render() {
      const { onAddQuestion } = this.props

      return (
         <Menu>
            <MenuButton>
               <AddQuestionWrapper>
                  <AddQuestionButton>+</AddQuestionButton>
                  <AddLabel>{formString.add_question}</AddLabel>
               </AddQuestionWrapper>
            </MenuButton>
            <MenuList>{this.renderMenuOptions()}</MenuList>
         </Menu>
      )
   }
}

export { AddQuestion }
