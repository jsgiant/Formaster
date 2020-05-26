import React from 'react'
import { FormListContainer } from './styledComponents'
import CreateFormCard from '../CreateFormCard/CreateFormCard'
import FormCard from '../FormCard'

class FormList extends React.Component {
   render() {
      return (
         <FormListContainer>
            <CreateFormCard />
            <FormCard />
         </FormListContainer>
      )
   }
}

export { FormList }
