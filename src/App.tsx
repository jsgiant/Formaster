import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { authStores } from './Authentication/stores'

import './App.css'
import { LoginFormRoute } from './Authentication/routes/LoginPageRoute/LoginFormRoute'
import authRoutes from './Authentication/routes'
import Header from './common/components/Header/Header'
import Dashboard from './User/components/Dashboard'

const App = () => {
   console.log(authStores)
   return (
      <Provider {...authStores}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
               <Route exact path='/' component={Dashboard} />
               {/* {authRoutes} */}
            </Switch>
         </Router>
      </Provider>
   )
}

export default App
