import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { selectAuth } from '@/auth/selectors'
import type { RootState } from './store'
import { baseUrl } from './config'

// const tagTypes = [
//   'Customers',
//   'Products',
//   'Orders',
//   'CurrentUser',
//   'Options'
// ]

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = selectAuth(getState() as RootState)
      if (accessToken) headers.set('Authorization', `Token ${accessToken}`)
      return headers
    },
  }),
  tagTypes: [
    'Customers',
    'Products',
    'Orders',
    'CurrentUser',
    'Options'
  ],
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }) {
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
