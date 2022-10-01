import { apiSlice } from '../../services/apiSlice'
import {
  Customer,
  Product,
  City,
  RawObjectsWithTotals,
} from '../../../interfaces'

type SearchObjectsArg = {
  url: string,
  params: {
    term: string
    page?: number
  }
}

type SearchResults = Customer[] | Product[] | City[]

// type RawCustomers = {
//   totalCount: number
//   totalPages: number
//   results: Customer[]
// }

// type RawProducts = {
//   totalCount: number
//   totalPages: number
//   results: Product[]
// }

// type RawCities = {
//   totalCount: number
//   totalPages: number
//   results: City[]
// }

// type RawSearchResults = RawCustomers | RawProducts | RawCities

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchObjects: builder.query<SearchResults, SearchObjectsArg>({
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
