import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { userRoutes } from './Admin/routes'
import { stores } from './stores'
import authRoutes from './Authentication/routes'
import FormScreenUI from './FormScreen/components/FormScreenUI'
import { formRoutes } from './FormScreen/routes'

const App = () => {
   return (
      <Provider {...stores}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
               {userRoutes}
               {authRoutes}
               {formRoutes}
            </Switch>
         </Router>
      </Provider>
   )
}

export default App
