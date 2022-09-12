import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { selectAuth } from '../components/auth/selectors'
import type { RootState } from '../components/Store'

export const baseUrl = 'http://127.0.0.1:8000/api'

export const tagTypes = [
  'Customers',
  'Products',
  'Orders',
  'CurrentUser',
  'Options'
]

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
  tagTypes,
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      // console.log('action.payload[reducerPath] ', action.payload[reducerPath])
      return action.payload[reducerPath]
    }
  },
})

export const {
  updateQueryData,
  getRunningOperationPromises,
  resetApiState,
} = apiSlice.util
