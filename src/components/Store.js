import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
// import {createLogger} from 'redux-logger'
import persistState from 'redux-localstorage'
import {routerMiddleware} from 'connected-react-router'
import {createBrowserHistory, createHashHistory} from 'history'
import rootReducer from './redux/index'

export const history = createHashHistory()

export default function configureStore(preloadedState) {
    // const history = createHashHistory()
    // const reducer = connectRouter(history)(rootReducer)
    const reducer = rootReducer(history)
    // const loggerMiddleware = createLogger()
    // const middlewares = [routerMiddleware(history), thunkMiddleware]
    const middlewares = [routerMiddleware(history), thunkMiddleware]
    if (process.env.NODE_ENV === `development`) {
	const {logger} = require(`redux-logger`)
	middlewares.push(logger)
    }
    const middlewareEnhancer = applyMiddleware(...middlewares)
    const enhancers = [middlewareEnhancer, persistState('auth', {key: 'AUTH'})]
    const composedEnhancers = compose(...enhancers)
    const store = createStore(reducer, preloadedState, composedEnhancers)
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./redux/index', () => store.replaceReducer(reducer))
    }
    // return {store, history}
    return store
}
