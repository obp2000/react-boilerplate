// import PropTypes from 'prop-types'
import React from 'react'
import {render as rtlRender} from '@testing-library/react'
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
// import {createMemoryHistory} from 'history'
import {MemoryRouter} from 'react-router-dom'
import {apiSlice} from '../services/apiSlice'
import auth from '../components/redux/auth'
import {rtkQueryErrorLogger} from '../components/ErrorMiddleware'

// const history = createMemoryHistory()

export const authPreloadedState = {
  auth: {
    isAuthenticated: true
  }
}

function render(
    ui, {
      preloadedState,
      store = configureStore({
        reducer: {
          auth,
          [apiSlice.reducerPath]: apiSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat([
            apiSlice.middleware,
            rtkQueryErrorLogger,
          ]),
        preloadedState,
      }),
      ...renderOptions
    } = {},
) {
  // function Wrapper({children}) {
  //   return  <Provider {...{store}} >
  //             {children}
  //           </Provider>
  // }
  const Wrapper = ({children}) =>
    <Provider {...{store}} >
      <MemoryRouter>
        {children}
      </MemoryRouter>
   </Provider>
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

// Wrapper.propTypes = {
//   children: PropTypes.object,
// }

// re-export everything
export * from '@testing-library/react'
// override render method
export {render}
