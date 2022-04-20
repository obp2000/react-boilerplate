import React from 'react'

import './assets/css/App.scss'
import "react-widgets/scss/styles.scss"
import 'react-toastify/dist/ReactToastify.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/css/App.css'

import 'numeral/locales/ru'
import numeral from 'numeral'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import configureStore from './components/Store'
import Layout from './components/Layout'

numeral.locale('ru')
// console.log('App')

const { store, history } = configureStore()

const App = () =>
    <Provider {...{store}}>
      <Layout {...{history}} />
    </Provider>

// if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./components/Layout', App)
// }

export default App
// export default hot(module)(App)
