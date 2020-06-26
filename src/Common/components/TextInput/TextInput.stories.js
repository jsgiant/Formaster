import React from 'react'
import { action } from '@storybook/addon-actions'

import TextInput from './TextInput'

export default {
   component: TextInput,
   title: 'Common/TextInput'
}

export const DefaultTextInput = () => (
   <TextInput validate={action('Validated')} />
)
