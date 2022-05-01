import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { apiSlice } from '../services/apiSlice'
import auth from '../components/redux/auth'
import { rtkQueryErrorLogger } from '../components/ErrorMiddleware'

const history = createMemoryHistory()

function render(
    ui, {
        preloadedState,
        store = configureStore({
            reducer: {
                auth,
                [apiSlice.reducerPath]: apiSlice.reducer
            },
            middleware: getDefaultMiddleware =>
                getDefaultMiddleware().concat([
                    apiSlice.middleware,
                    rtkQueryErrorLogger
                ]),
            preloadedState
        }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider {...{store}} >
            <Router {...{history}} >
              {children}
            </Router>
          </Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }