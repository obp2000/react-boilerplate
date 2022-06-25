import {apiSlice} from '../../services/apiSlice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    searchObjects: builder.query({
        query: ({
            url,
            params,
        }) => ({
            url,
            params: {...params, page_size: 1000000},
        }),
        transformResponse: ({results}, meta, arg) => results,
    }),
  })
})

export const {
    useLazySearchObjectsQuery,
} = extendedApiSlice
