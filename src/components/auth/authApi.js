import {apiSlice} from '../../services/apiSlice'

const invalidatesOptionsAndCurrentUser =
    (result, error) => error ? [] : ['Options', 'CurrentUser']

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
    	query: credentials => ({
            url: '/login/',
            method: 'POST',
            body: credentials,
        }),
        //  async queryFn(args, {dispatch}, extraOptions, baseQuery) {
        //     const result = await baseQuery({
        //         url: '/login/',
        //         method: 'POST',
        //         body: args
        //     })
        //     if (result.error) return result
        // 	dispatch(setAuthenticated(result.data))
        //     dispatch(getUser.initiate())
        //     return result
        // },
        invalidatesTags: invalidatesOptionsAndCurrentUser,
    }),
    register: builder.mutation({
        query: values => ({
            url: '/register/',
            method: 'POST',
            body: values,
        }),
        // async queryFn(args, { dispatch }, extraOptions, baseQuery) {
        //     const result = await baseQuery({
        //         url: '/register/',
        //         method: 'POST',
        //         body: args
        //     })
        //     if (result.error) return result
        //     dispatch(setAuthenticated(result.data))
        //     dispatch(getUser.initiate())
        //     return result
        // },
        invalidatesTags: invalidatesOptionsAndCurrentUser,
    }),
    signOut: builder.mutation({
        query: () => ({
            url: '/logout/',
            method: 'POST',
        }),
        invalidatesTags: [
            {type: 'Options', id: '/customers/'},
            {type: 'Options', id: '/products/'},
            {type: 'Options', id: '/orders/'}
        ]
    }),
  })
})

export const {
    login,
    register,
    signOut
} = extendedApiSlice.endpoints

export const {
    useLoginMutation,
    useRegisterMutation,
    useSignOutMutation,
} = extendedApiSlice
