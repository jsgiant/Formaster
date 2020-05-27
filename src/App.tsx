import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { authStores } from './Authentication/stores'
import authRoutes from './Authentication/routes'
import { userRoutes } from './User/routes'

const App = () => {
   console.log(authStores)
   return (
      <Provider {...authStores}>
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
