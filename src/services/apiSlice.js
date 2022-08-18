import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {HYDRATE} from 'next-redux-wrapper'
import {selectAuth} from '../components/auth/selectors'

export const baseUrl = 'http://127.0.0.1:8000/api'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const {accessToken} = selectAuth(getState())
      if (accessToken) headers.set('Authorization', `Token ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ['Customers', 'Products', 'Orders', 'CurrentUser', 'Options'],
  endpoints: () => ({}),
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})

export const {
  updateQueryData,
  getRunningOperationPromises,
  resetApiState,
} = apiSlice.util
