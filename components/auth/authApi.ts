import type {
  Login,
  LoginFormValues,
  Register,
  RegisterFormValues,
  SignOut
} from '../../interfaces/auth'
import { apiSlice } from '../../services/apiSlice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Login, LoginFormValues>({
      query: (credentials) => ({
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
      invalidatesTags: (_, error) => error ? [] : ['Options', 'CurrentUser'],
    }),
    register: builder.mutation<Register, RegisterFormValues>({
      query: (values) => ({
        url: '/register/',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: (_, error) => error ? [] : ['Options', 'CurrentUser'],
    }),
    signOut: builder.mutation<SignOut, void>({
      query: () => ({
        url: '/logout/',
        method: 'POST',
      }),
      invalidatesTags: [
        { type: 'Options', id: '/customers/' },
        { type: 'Options', id: '/products/' },
        { type: 'Options', id: '/orders/' },
      ],
    }),
  }),
  // overrideExisting: true,
})

export const {
  login,
  register,
  signOut,
} = extendedApiSlice.endpoints

export const {
  useLoginMutation,
  useRegisterMutation,
  useSignOutMutation,
} = extendedApiSlice
