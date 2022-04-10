import { createStore } from 'redux'
import { createHashHistory } from 'history'
import rootReducer from './redux/index'
import StoreEnhancer from './StoreEnhancer'

const configureStore = preloadedState => {
    const history = createHashHistory()
    const reducer = rootReducer(history)
    const store = createStore(reducer, preloadedState, StoreEnhancer(history))
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./redux/index', () => store.replaceReducer(reducer))
    }
    return { store, history }
}

export default configureStore