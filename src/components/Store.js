// import { createStore } from 'redux'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { logger } from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit'
import persistState from 'redux-localstorage'
import rootReducer from './redux/index'
import { apiSlice } from '../services/apiSlice'

export const configureStoreFunc = preloadedState => {
    const history = createHashHistory()
    const reducer = rootReducer(history)
    const store = configureStore({
        reducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat([
                routerMiddleware(history),
                apiSlice.middleware,
                logger]),
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState,
        enhancers: [persistState('auth', { key: 'AUTH' })]
    })

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./redux/index', () => store.replaceReducer(reducer))
    }

    return { store, history }
}

export default configureStoreFunc



// import StoreEnhancer from './StoreEnhancer'

// const configureStore = preloadedState => {
//     const history = createHashHistory()
//     const reducer = rootReducer(history)
//     const store = createStore(reducer, preloadedState, StoreEnhancer(history))
//     if (process.env.NODE_ENV !== 'production' && module.hot) {
//         module.hot.accept('./redux/index', () => store.replaceReducer(reducer))
//     }
//     return { store, history }
// }

// export default configureStore
