import React from 'react'
// import * as ReactDOM from 'react-dom'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import 'numeral/locales/ru'
import numeral from 'numeral'
import configureStore from './components/Store'
import App from './App'
import ToastContainer from './components/Shared/ToastContainer'

import './assets/css/App.scss'
import 'react-widgets/scss/styles.scss'
import 'react-toastify/dist/ReactToastify.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/css/App.css'

numeral.locale('ru')

const store = configureStore()
const domContainer = document.querySelector('#root')
const root = createRoot(domContainer)
root.render(
    <Provider {...{store}}>
      <HashRouter>
        <ToastContainer />
        <App />
      </HashRouter>
    </Provider>,
)

// ReactDOM.render(<App />, document.getElementById('root'))
