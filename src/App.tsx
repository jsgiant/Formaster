import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { userRoutes } from './User/routes'
import { stores } from './stores'
import authRoutes from './Authentication/routes'

const App = () => {
   console.log(stores)
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
