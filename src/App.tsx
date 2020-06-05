import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { adminRoutes } from './Admin/routes'
import { stores } from './Common/stores'
import { Toaster } from './Common/utils/ToastUtils'
import authRoutes from './Authentication/routes'
import { userRoutes } from './User/routes'

const App = () => {
   return (
      <Provider {...stores}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
               {userRoutes}
               {adminRoutes}
               {authRoutes}
            </Switch>
         </Router>
         <Toaster />
      </Provider>
   )
}

export default App
