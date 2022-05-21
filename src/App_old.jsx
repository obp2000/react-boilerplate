import React from 'react'
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import 'numeral/locales/ru'
import numeral from 'numeral'
import configureStore from './components/Store'
import NavRoutes from './NavRoutes'
// import PrivateRoute from './components/Shared/privateRoute'

numeral.locale('ru')
const store = configureStore()

const App = () =>
  <Provider {...{store}}>
    <HashRouter>
      <NavRoutes />
    </HashRouter>
  </Provider>

// if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./components/Layout', App)
// }

export default App
// export default hot(module)(App)
