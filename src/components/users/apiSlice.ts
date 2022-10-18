import { apiSlice } from '../../services/apiSlice'
import type { User } from '../../../interfaces/users'

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => '/user/',
      providesTags: ['CurrentUser'],
    }),
  }),
})

export const { useGetUserQuery } = extendedApiSlice

export default extendedApiSlice

export const { getUser } = extendedApiSlice.endpoints
