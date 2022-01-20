import React from 'react'
import Layout from './Layout'
// import 'react-widgets/dist/css/react-widgets.css'
// import "react-widgets/styles.css"
import "react-widgets/scss/styles.scss"
import '../styles/App.css'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import configureStore, { history } from './Store'

const store = configureStore()

const Main = () =>
    <Provider store={store}>
      <Layout history={history}/>
    </Provider>

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./Layout', Main)
}

// export default Main
export default hot(module)(Main)