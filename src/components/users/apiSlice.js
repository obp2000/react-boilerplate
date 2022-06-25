import {apiSlice} from '../../services/apiSlice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
        query: () => '/user/',
        providesTags: ['CurrentUser'],
    }),
  })
})

export const {
    useLazyGetUserQuery,
} = extendedApiSlice
