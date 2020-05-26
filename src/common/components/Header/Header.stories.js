import React from 'react'
import { action } from '@storybook/addon-actions'
import Header from './Header'

export default {
   title: 'Common/Header',
   component: Header
}

export const defaultHeader = () => (
   <Header onLogoutClick={action('logged out')} />
)
