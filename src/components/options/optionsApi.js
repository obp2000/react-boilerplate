import {apiSlice} from '../../services/apiSlice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getOptions: builder.query({
        query: (url) => ({
            url,
            method: 'OPTIONS',
        }),
        transformResponse: ({
            common_consts: commonConsts,
            actions,
        }, meta, arg) => ({
            commonConsts,
            options: actions.POST || actions.PUT,
            arg,
        }),
        providesTags: ['Options'],
    }),

  })
})

export const {
    useGetOptionsQuery,
    useLazyGetOptionsQuery
} = extendedApiSlice
