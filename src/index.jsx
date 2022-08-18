import React from 'react'
import {createRoot, hydrateRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import {hydrate} from 'react-dom'
import 'react-widgets/scss/styles.scss'
import './assets/css/App.scss'
import configureStore from './components/Store'
import App from './App'

const domContainer = document.querySelector('#root')
const store = configureStore()
const Router = HashRouter

const IndexComp = <Provider store={store}>
  <Router>
    <App />
  </Router>
</Provider>

createRoot(domContainer).render(IndexComp)

// if (window.__PRELOADED_STATE__) {
//   delete window.__PRELOADED_STATE__
//   hydrateRoot(domContainer, IndexComp)
// } else {
//   createRoot(domContainer).render(IndexComp)
// }
