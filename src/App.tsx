import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import { adminRoutes } from './Admin/routes'
import { stores } from './Common/stores'
import authRoutes from './Authentication/routes'
import { userRoutes } from './User/routes'

const Toaster = () => {
   return (
      <ToastContainer
         position='bottom-center'
         autoClose={5000}
         hideProgressBar
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss={false}
         draggable
         pauseOnHover={false}
      />
   )
}

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
      </Provider>
   )
}

export default App
