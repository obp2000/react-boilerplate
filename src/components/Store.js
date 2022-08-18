import {configureStore} from '@reduxjs/toolkit'
import {createWrapper} from 'next-redux-wrapper'
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper'
// import {logger} from 'redux-logger'
import logger from './logger'
// import persistState from 'redux-localstorage'
import {combineReducers} from 'redux'
import {apiSlice} from '../services/apiSlice'
import {rtkQueryErrorLogger} from './ErrorMiddleware'
import auth from './auth/authSlice'
import authModal from './auth/modalSlice'
// import {reducerWithHydrate} from './hydrate'

export const makeStore = wrapMakeStore(() => configureStore({
  reducer: {
    auth,
    authModal,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend([
    nextReduxCookieMiddleware({subtrees: ['auth']}),
    apiSlice.middleware,
    rtkQueryErrorLogger,
    // logger,
  ]),
  devTools: process.env.NODE_ENV !== 'production',
  // preloadedState,
  // enhancers: [persistState('auth', {key: 'AUTH'})],
})
)

// export default configureStoreFunc

export const wrapper = createWrapper(makeStore, {debug: true})


// const makeStore = wrapMakeStore(() =>
//    createStore(
//       reducer: {
//         auth,
//         authModal,
//         [apiSlice.reducerPath]: apiSlice.reducer,
//     },
//     applyMiddleware(
//      nextReduxCookieMiddleware({
//        subtrees: ["my.subtree"],
//      })
//     )
//   )
// )

// const makeStore = wrapMakeStore(() =>
//   configureStore({
//     reducer: {...},
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().prepend(
//         nextReduxCookieMiddleware({
//           subtrees: ["my.subtree"],
//         })
//       ),
//   })
// );


// export const initializeStore = (preloadedState = emptyObject, api) => {
//   const combinedReducer = combineReducers({
//     // stuff: preloadedState.stuff,
//     auth: preloadedState.auth,
//     authModal: preloadedState.authModal,
//     [api.reducerPath]: api.reducer,
//   })

//   const store = configureStore({
//     reducer: reducerWithHydrate(
//       preloadedState,
//       combinedReducer
//     ),
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
//       api.middleware,
//       rtkQueryErrorLogger,
//       logger,
//     ]),
//     devTools: true,
//     preloadedState,
//     enhancers: [persistState('auth', {key: 'AUTH'})],
//   })

//   setupListeners(store.dispatch)

//   return store
// }

