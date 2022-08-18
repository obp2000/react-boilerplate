import {apiSlice} from '../../services/apiSlice'

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/user/',
      providesTags: ['CurrentUser'],
    }),
  }),
})

export const {useGetUserQuery} = extendedApiSlice

export default extendedApiSlice

export const {getUser} = extendedApiSlice.endpoints
