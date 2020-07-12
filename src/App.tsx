import React, { Suspense } from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import LoadingView from './Common/components/LoadingWrapperWithFailure/LoadingView'
import { stores } from './Common/stores'
import { Toaster } from './Common/utils/ToastUtils'
import authRoutes from './Authentication/routes'
import { adminRoutes } from './Admin/routes'
import { userRoutes } from './User/routes'

const App = () => {
   return (
      <Provider {...stores}>
         <Suspense fallback={LoadingView}>
            <Router basename={process.env.PUBLIC_URL}>
               <Switch>
                  {userRoutes}
                  {adminRoutes}
                  {authRoutes}
               </Switch>
            </Router>
            <Toaster />
         </Suspense>
      </Provider>
   )
}

export default App
