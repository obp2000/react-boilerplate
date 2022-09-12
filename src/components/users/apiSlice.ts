import { apiSlice } from '../../services/apiSlice'
import { User as GetObject } from '../../../interfaces'

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<GetObject, void>({
      query: () => '/user/',
      providesTags: ['CurrentUser'],
    }),
  }),
})

export const { useGetUserQuery } = extendedApiSlice

export default extendedApiSlice

export const { getUser } = extendedApiSlice.endpoints
