import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errors: null,
};

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    receiveErrors: (state, { payload }) => {
      console.error('e: ', payload);
      // console.log('payload keys ..... ', payload.message)
      // const {
      //     message,
      //     response: {
      //         data = {}
      //     } = {}
      // } = error
      // console.error('e: ', error)
      // let error_messsages = ['Ошибка!']
      // if (Object.keys(data).length != 0) {
      //     error_messsages = []
      //     Object.keys(data).slice(0, 50).map((key, index) =>
      //         error_messsages.push(`${key}: ${data[key]}`)
      //     )
      //     // error_messsages = Object.values(data).flat()
      // } else if (message) {
      //     error_messsages = [message.substring(0, 100)]
      // } else if (error.toJSON().message) {
      //     error_messsages = [error.toJSON().message]
      // }
      state.errors = [payload.message];
    },
    clearErrors: (state) => initialState,
  },
});

export const {
  receiveErrors,
  clearErrors,
} = errorsSlice.actions;

export default errorsSlice.reducer;

// const reducer_actions = {}

// export const receiveErrors = createAction('receiveErrors')
// export const clearErrors = createAction('clearErrors')
// // export const renderFlash = createAction('renderFlash')

// reducer_actions[receiveErrors] = (state, errors) =>
//     ({
//         ...state,
//         errors
//     })

// reducer_actions[clearErrors] = state =>
//     ({
//         ...state,
//         ...initialState
//     })

// // reducer_actions[renderFlash] = (state, flash) =>
// //     ({
// //         ...state,
// //         flash
// //     })

// const errors = createReducer(reducer_actions, initialState)

// export default errors
