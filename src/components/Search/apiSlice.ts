import type { RawObjectsWithTotals } from '../../../interfaces/api'
import type { SearchResult } from '../../../interfaces/dropdownList'
import type { SearchObjectsArg } from '../../../interfaces/search'
import { apiSlice } from '../../services/apiSlice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchObjects: builder.query<SearchResult[], SearchObjectsArg>({
      query: ({
        url,
        params,
      }) => ({
        url,
        params: { ...params, page_size: 1000000 },
      }),
      transformResponse: ({ results }: RawObjectsWithTotals) => results,
    }),
  }),
})

export const {
  useLazySearchObjectsQuery,
} = extendedApiSlice
