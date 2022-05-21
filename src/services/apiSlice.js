import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {objectToFormData} from 'object-to-formdata'
import {setAuthenticated} from '../components/redux/auth'

export const baseUrl = 'http://127.0.0.1:8000/api'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const {
        auth: {
          accessToken,
        },
      } = getState()
      if (accessToken) headers.set('Authorization', `Token ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ['Objects', 'CurrentUser', 'Options'],
  endpoints: (builder) => ({
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
    getObjects: builder.query({
      query: ({
        url,
        params,
      }) => ({
        url,
        params,
      }),
      providesTags: ({results}) =>
                results ? [
                  ...results.map(({id}) => ({type: 'Objects', id})),
                  {type: 'Objects', id: 'LIST'},
                ] : [{type: 'Objects', id: 'LIST'}],
    }),
    createObject: builder.mutation({
      query: ({
        url,
        toFormData,
        ...values
      }) => ({
        url,
        method: 'POST',
        body: toFormData ? objectToFormData(values) : values,
      }),
      // async onQueryStarted({
      //     url,
      //     toFormData,
      //     ...values
      // }, { dispatch, queryFulfilled }) {
      //     try {
      //         const { data: newObject } = await queryFulfilled
      //         const patchResult = dispatch(
      //             apiSlice.util.updateQueryData('getObject',
      //              { url, id: newObject.id },
      //                 draft => ({ ...draft, ...newObject })
      //             )
      //         )
      //     } catch {}
      // },
      invalidatesTags: [{type: 'Objects', id: 'LIST'}],
    }),
    getObject: builder.query({
      query: ({
        url,
        id,
      }) => ({
        url: `${url}${id}/`,
      }),
      providesTags: (result, error, {id}) => [{type: 'Objects', id}],
    }),
    updateObject: builder.mutation({
      query: ({
        url,
        id,
        toFormData,
        ...values
      }) => ({
        url: `${url}${id}/`,
        method: 'PUT',
        body: toFormData ? objectToFormData(values) : values,
      }),
      async onQueryStarted({
        url,
        id,
        toFormData,
        ...values
      }, {dispatch, queryFulfilled}) {
        try {
          const {data: updatedObject} = await queryFulfilled
          dispatch(apiSlice.util.updateQueryData('getObject', {url, id},
              (draft) => ({...draft, ...updatedObject}),
          ),
          )
        } catch {
          (e) => e
        }
      },
      invalidatesTags: [{type: 'Objects', id: 'LIST'}],
      // invalidatesTags: (result, error, { id }) => [{ type: 'Objects', id }],
    }),
    deleteObject: builder.mutation({
      query: ({
        url,
        id,
      }) => ({
        url: `${url}${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, {id}) => [{type: 'Objects', id},
        {type: 'Objects', id: 'LIST'},
      ],
    }),
    getUser: builder.query({
      query: () => '/user/',
      // async queryFn(args, queryApi, extraOptions, baseQuery) {
      //     const optionsResult =
      //      await baseQuery('/user/', {method: 'OPTIONS'})
      //     if (optionsResult.error) throw optionsResult.error
      //     const result = await baseQuery('/user/')
      //     console.log('result ', result)
      //     return result.data ? { data: result.data } :
      //        { error: result.error }
      // },

      // providesTags: (result, error, { id }) => [{ type: 'Objects', id }],
      providesTags: ['CurrentUser'],
    }),
    getAuthOptions: builder.query({
      query: (url) => ({
        url,
        method: 'OPTIONS',
      }),
      transformResponse: ({
        actions,
      }, meta, arg) => ({
        options: actions.POST || actions.PUT,
      }),
      // providesTags: ['Options'],
    }),
    login: builder.mutation({
      // query: credentials => ({
      //     url: '/login/',
      //     method: 'POST',
      //     body: credentials,
      // }),
      async queryFn(args, {dispatch}, extraOptions, baseQuery) {
        const result = await baseQuery({
          url: '/login/',
          method: 'POST',
          body: args})
        if (result.error) return result
        dispatch(setAuthenticated(result.data))
        dispatch(apiSlice.endpoints.getUser.initiate())
        return result
      },
      invalidatesTags: (result, error) => error ? [] : ['Options'],
    }),
    register: builder.mutation({
      // query: values => ({
      //     url: '/register/',
      //     method: 'POST',
      //     body: values,
      // }),
      async queryFn(args, {dispatch}, extraOptions, baseQuery) {
        const result = await baseQuery({
          url: '/register/',
          method: 'POST',
          body: args})
        if (result.error) return result
        dispatch(setAuthenticated(result.data))
        dispatch(apiSlice.endpoints.getUser.initiate())
        return result
      },
      invalidatesTags: (result, error) => error ? [] : ['Options'],
    }),
    signOut: builder.mutation({
      query: () => ({
        url: '/logout/',
        method: 'POST',
      }),
      invalidatesTags: ['Options'],
    }),
    searchObjects: builder.query({
      query: ({
        url,
        params,
      }) => ({
        url,
        params,
      }),
      transformResponse: ({results}, meta, arg) => results,
    }),
  }),
})

// const to_object_id = (id) => (id == 'new') ? '' : `${id}/`

export const {
  useGetOptionsQuery,
  useGetObjectsQuery,
  useGetObjectQuery,
  useCreateObjectMutation,
  useUpdateObjectMutation,
  useDeleteObjectMutation,
  useGetUserQuery,
  useGetAuthOptionsQuery,
  useLoginMutation,
  useRegisterMutation,
  useSignOutMutation,
  useSearchObjectsQuery,
} = apiSlice

export const {searchObjects} = apiSlice.endpoints

// const emptyObject = {}

// export const useCommonConsts = ({ url, params } = {}) =>
//     useGetOptionsQuery({ url, params }, {
//         selectFromResult: ({
//             data: {
//                 commonConsts
//             } = emptyObject
//         }) => commonConsts
//     })

// export const useOptions = ({ url, params } = {}) =>
//     useGetOptionsQuery({ url, params }, {
//         selectFromResult: ({
//             data: {
//                 options
//             } = emptyObject
//         }) => options
//     })

// export const getObjectsThunk = indexUrl => createAsyncThunk(
//     'getObjects',
//     async (_, { getState }) => {
//         const { data } = await api.get(
//             indexUrl, { params: selectLocation(getState()).query }
//         )
//         return data
//     }
// )
