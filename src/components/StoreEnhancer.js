import { applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import persistState from 'redux-localstorage'
import { routerMiddleware } from 'connected-react-router'
import { logger } from 'redux-logger'

const StoreEnhancer = history => {
    const middlewares = [routerMiddleware(history), thunkMiddleware]
    if (process.env.NODE_ENV === 'development') {
        middlewares.push(logger)
    }
    const composes =[applyMiddleware(...middlewares)]
    if (process.env.NODE_ENV !== 'test') {
        composes.push(persistState('auth', { key: 'AUTH' }))
    }
    return compose(...composes)
}

export default StoreEnhancer
