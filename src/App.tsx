import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { userRoutes } from './Admin/routes'
import { stores } from './Common/stores'
import authRoutes from './Authentication/routes'

const App = () => {
   return (
      <Provider {...stores}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
               {userRoutes}
               {authRoutes}
            </Switch>
         </Router>
      </Provider>
   )
}

export default App
