import {createAction, createReducer} from '@reduxjs/toolkit'

export const hydrate = createAction('hydrate')

export const reducerWithHydrate = (preloadedState, combinedReducer) => {
  return createReducer(preloadedState, (builder) => {
    builder
        .addCase(hydrate, (state, action) => {
          if (!action.isInitialHydrate) {
            return state
          }
          const nextState = {...state, ...action.payload}
          // Exclude anything that's purely client state here
          // by overriding what came from the action
          // if (state.stuff) nextState.stuff = state.stuff;
          if (state.auth) nextState.auth = state.auth
          if (state.authModal) nextState.authModal = state.authModal
          return nextState
        })
        .addDefaultCase((state, action) => combinedReducer(state, action))
  })
}
