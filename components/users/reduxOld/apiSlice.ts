import type { User } from '@/interfaces/users'
import { apiSlice } from '@/services/apiSlice'

export const url = '/user/'

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => url,
      providesTags: ['CurrentUser'],
    }),
  }),
})

export const { useGetUserQuery } = extendedApiSlice

export default extendedApiSlice

export const { getUser } = extendedApiSlice.endpoints
