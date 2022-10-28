import type { CommonConstsType } from '../../interfaces/commonConsts'
import type {
  AnyOptionsType,
  RawOptionsAndCommonConsts
} from '../../interfaces/options'
import { apiSlice } from '../../services/apiSlice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOptions: builder.query<AnyOptionsType & CommonConstsType, string>({
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
