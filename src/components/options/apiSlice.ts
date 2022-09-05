import {apiSlice} from '../../services/apiSlice'
import {
  CommonConsts,
  CustomerOptions,
  ProductOptions,
  OrderOptions,
  UserOptions,
} from '../../../interfaces'
import {
  LoginOptions,
  RegisterOptions,
} from '../../../interfaces/auth'

// const emptyObject = {}

export type TableOptions = CustomerOptions & ProductOptions & OrderOptions

export type TableOptionsAndCommonConsts = {
  commonConsts: CommonConsts
  options: TableOptions
}

type AllOptions = TableOptions & UserOptions & LoginOptions & RegisterOptions

export type OptionsAndCommonConsts = {
  commonConsts?: CommonConsts
  options?: AllOptions
}

type RawOptionsAndCommonConsts = {
  common_consts?: CommonConsts
  actions?: {
    // POST?: AllOptions
    // PUT?: AllOptions
    [index: string]: AllOptions
  }
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOptions: builder.query<OptionsAndCommonConsts, string>({
      query: (url) => ({url, method: 'OPTIONS',}),
      transformResponse: (
      {
        common_consts: commonConsts,
        actions,
      }: RawOptionsAndCommonConsts) => ({
          commonConsts,
          options: actions?.POST ?? actions?.PUT,
        }),
      providesTags: (_, __, arg) => [{type: 'Options', id: arg}],
    }),
  }),
})

export const {
  useGetOptionsQuery,
  useLazyGetOptionsQuery,
} = extendedApiSlice

export const {getOptions} = extendedApiSlice.endpoints
