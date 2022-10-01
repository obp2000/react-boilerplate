import { apiSlice } from '../../services/apiSlice'
import type {
  CommonConsts,
  AnyOptions,
  AnyOptionsAndCommonConsts,
} from '../../../interfaces'

type RawOptionsAndCommonConsts = {
  common_consts?: CommonConsts
  actions?: { [index: string]: AnyOptions }
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOptions: builder.query<AnyOptionsAndCommonConsts, string>({
      query: (url) => ({ url, method: 'OPTIONS', }),
      transformResponse: (
        {
          common_consts: commonConsts,
          actions,
        }: RawOptionsAndCommonConsts) => ({
          commonConsts,
          options: actions?.POST ?? actions?.PUT,
        }),
      providesTags: (_, __, arg) => [{ type: 'Options', id: arg }],
    }),
  }),
})

export const {
  useGetOptionsQuery,
  useLazyGetOptionsQuery,
} = extendedApiSlice

export const { getOptions } = extendedApiSlice.endpoints
