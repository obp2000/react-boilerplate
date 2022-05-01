import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../services/apiSlice';

const initialState = {
  data: [],
  // isFetching: false,
  // loaded: false,
  busy: false,
  // status: 'idle',
  // error: null
};

export const tempStateSlice = createSlice({
  name: 'temp_state',
  initialState,
  reducers: {
    clearSearchObjects: (state) => {
      state.data = initialState.data;
    },
  },
  extraReducers(builder) {
    builder;
    // .addCase(searchObjectsAction.pending, (state, action) => {
    //     state.status = 'pending'
    //     state.data = initialState.data
    // })
    // .addCase(searchObjectsAction.fulfilled, (state, { payload }) => {
    //     state.status = initialState.status
    //     state.error = initialState.error
    //     state.data = payload
    // })
    // .addCase(searchObjectsAction.rejected, (state, {
    //     error: {
    //         message
    //     }
    // }) => {
    //     state.status = 'rejected'
    //     state.error = message
    //     state.data = initialState.data
    // })
    // .addMatcher(
    //     apiSlice.endpoints.searchObjects.matchPending, (state, { payload }) => {
    //         state.data = initialState.data
    //         state.busy = true
    //     }
    // )
    // .addMatcher(
    //     apiSlice.endpoints.searchObjects.matchFulfilled, (state, { payload }) => {
    //         state.data = payload
    //         state.busy = initialState.busy
    //     }
    // )
  },
});

export const {
  // startRequest,
  // successRequest,
  // failedRequest,
  // requestSearchObjects,
  // successSearchObjects,
  // failedSearchObjects,
  clearSearchObjects,
} = tempStateSlice.actions;

export default tempStateSlice.reducer;

export const selectTempState = ({
  temp_state,
}) => temp_state;

export const selectData = createSelector([selectTempState], ({
  data = initialState.data,
}) => data);

export const selectBusy = createSelector([selectTempState], ({
  busy = initialState.busy,
}) => busy);

// export const startRequest = createAction('startRequest')
// export const successRequest = createAction('successRequest')
// export const failedRequest = createAction('failedRequest')

// export const requestSearchObjects = createAction('requestSearchObjects')
// export const successSearchObjects = createAction('successSearchObjects')
// export const failedSearchObjects = createAction('failedSearchObjects')
// export const clearSearchObjects = createAction('clearSearchObjects')

// const reducer_actions = {}

// const initialState = {
//     data: [],
//     isFetching: false,
//     loaded: false,
//     isFieldFetching: false
// }

// reducer_actions[startRequest] = state =>
//     ({
//         ...state,
//         isFetching: true,
//         loaded: false,
//     })

// reducer_actions[successRequest] = state =>
//     ({
//         ...state,
//         isFetching: false,
//         loaded: true,
//     })

// reducer_actions[failedRequest] = state =>
//     ({
//         ...state,
//         isFetching: false,
//         loaded: false,
//     })

// reducer_actions[requestSearchObjects] = state =>
//     ({
//         ...state,
//         data: [],
//         isFieldFetching: true
//     })

// reducer_actions[successSearchObjects] = (state, data) =>
//     ({
//         ...state,
//         data,
//         isFieldFetching: false
//     })

// reducer_actions[failedSearchObjects] = state =>
//     ({
//         ...state,
//         data: [],
//         isFieldFetching: false
//     })

// reducer_actions[clearSearchObjects] = state =>
//     ({
//         ...state,
//         data: []
//     })

// const TempState = createReducer(reducer_actions, initialState)

// export default TempState

// export const searchObjectsThunk = search_path => createAsyncThunk(
//     'searchObjects',
//     async term => {
//         if (typeof(term) == 'string' && term.length > 1) {
//             const {
//                 data: {
//                     results
//                 }
//             } = await api.get(
//                 search_path, {
//                     params: {
//                         term: decodeURIComponent(term),
//                         page_size: 1000000
//                     }
//                 },
//             )
//             return results
//         }
//     }
// )

// const searchObjectsAction = searchObjectsThunk()
