import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { authStores } from './Authentication/stores'

import './App.css'
import { LoginFormRoute } from './Authentication/routes/LoginPageRoute/LoginFormRoute'
import authRoutes from './Authentication/routes'
import Header from './common/components/Header/Header'

const App = () => {
   console.log(authStores)
   return (
      <Provider {...authStores}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
               <Route exact path='/header' component={Header} />
               {authRoutes}
            </Switch>
         </Router>
      </Provider>
   )
}

export default App
