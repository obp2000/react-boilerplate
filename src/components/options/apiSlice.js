import {apiSlice} from '../../services/apiSlice'

const emptyObject = {}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOptions: builder.query({
      query: (url) => ({
        url,
        method: 'OPTIONS',
      }),
      transformResponse: ({
        common_consts: commonConsts = emptyObject,
        actions: {
          POST: post,
          PUT: put,
        } = emptyObject,
      }, meta, arg) => ({
        commonConsts,
        options: post ?? put ?? emptyObject,
        arg,
      }),
      providesTags: (result, error, arg) => [{type: 'Options', id: arg}],
    }),

  }),
})

export const {
  useGetOptionsQuery,
  useLazyGetOptionsQuery,
} = extendedApiSlice

export const {getOptions} = extendedApiSlice.endpoints
