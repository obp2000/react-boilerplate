import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {createEntityAdapter} from '@reduxjs/toolkit'
import {objectToFormData} from 'object-to-formdata'
import {selectAuth} from '../components/auth/selectors'

export const baseUrl = 'http://127.0.0.1:8000/api'

export const objectsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updated_at.localeCompare(a.updated_at),
})
export const objectsInitialState = objectsAdapter.getInitialState()

const {
  setAll,
  addOne,
  upsertOne,
  removeOne,
} = objectsAdapter

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const {accessToken} = selectAuth(getState())
      if (accessToken) headers.set('authorization', `Token ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ['/customers/', 'Customers', '/products/', '/orders/', 'CurrentUser',
    'Options'],
  endpoints: (builder) => ({
    // getObjects: builder.query({
    //     query: ({
    //         url,
    //         params,
    //     }) => ({
    //         url,
    //         params,
    //     }),
    //     transformResponse: ({
    //         totalCount,
    //         totalPages,
    //         results
    //     }) => ({
    //         totalCount,
    //         totalPages,
    //         ...setAll(objectsInitialState, results)
    //     }),
    //     // providesTags: ({results = []} = {}, error, arg) =>
    //     //   [...results.map(({id}) => ({type: 'Objects', id})),
    //     //     {type: 'Objects', id: 'LIST'}],
    //     providesTags: ({ids}, error, {url}) =>
    //       [...ids.map((id) => ({type: url, id})),
    //         {type: url, id: 'LIST'}],
    // }),
    // createObject: builder.mutation({
    //     query: ({
    //         url,
    //         toFormData,
    //         tableArgs,
    //         ...values
    //     }) => ({
    //         url,
    //         method: 'POST',
    //         body: toFormData ? objectToFormData(values) : values,
    //     }),
    //     async onQueryStarted({
    //         url,
    //         toFormData,
    //         tableArgs,
    //         ...values
    //     }, {dispatch, queryFulfilled}) {
    //         if (tableArgs) {
    //             try {
    //                 const {data: newObject} = await queryFulfilled
    //                 const patchResult = dispatch(updateQueryData(
    //                     'getObjects', tableArgs,
    //                     (draftObjects) => {
    //                         addOne(draftObjects, newObject)
    //                         draftObjects.totalCount++
    //                     })
    //                 )
    //             } catch {}
    //         }
    //     },
    //     // invalidatesTags: [{ type: 'Objects', id: 'LIST' }],
    //     invalidatesTags: (result, error, {url, tableArgs}) => {
    //         if (!tableArgs) {
    //             return [{type: url, id: 'LIST'}]
    //         }
    //     },
    // }),
    // getObject: builder.query({
    //     query: ({
    //         url,
    //         id,
    //     }) => ({
    //         // url: `${url}${id}/`,
    //         url,
    //         params: {id},
    //     }),
    //     providesTags: (result, error, {url, id}) => [{type: url, id}],
    // }),
    updateObject: builder.mutation({
      query: ({
        url,
        id,
        toFormData,
        tableArgs,
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
        tableArgs,
        ...values
      }, {dispatch, queryFulfilled}) {
        try {
          const {data: updatedObject} = await queryFulfilled
          if (tableArgs) {
            dispatch(updateQueryData(
                'getObjects', tableArgs, (draftObjects) =>
                  upsertOne(draftObjects, updatedObject)
            ))
          } else {
            dispatch(updateQueryData(
                'getObject', {url, id}, (draftObject) =>
                  ({...draftObject, ...updatedObject})
            ))
          }
        } catch {}
      },
      // invalidatesTags: (result, error, arg) =>
      //     [{ type: 'Objects', id: 'LIST' }],
      invalidatesTags: (result, error, {url, tableArgs}) => {
        if (!tableArgs) {
          return [{type: url, id: 'LIST'}]
        }
      },
    }),
    // deleteObject: builder.mutation({
    //     query: ({
    //         url,
    //         id,
    //         tableArgs
    //     }) => ({
    //         url,
    //         params: {id},
    //         method: 'DELETE',
    //     }),
    //     onQueryStarted({
    //         url,
    //         id,
    //         tableArgs
    //     }, {dispatch, queryFulfilled}) {
    //         const patchObjects = dispatch(updateQueryData(
    //             'getObjects', tableArgs, (draftObjects) => {
    //                 removeOne(draftObjects, id)
    //                 draftObjects.totalCount--
    //             }
    //         ))
    //         queryFulfilled.catch(patchObjects.undo)
    //     },
    //     // invalidatesTags: (result, error, { id }) => [
    //     //     { type: 'Objects', id }, { type: 'Objects', id: 'LIST' }],
    //     // invalidatesTags: (result, error, {id}) => {
    //     //     if (!tableArgs) {
    //     //         return [{ type: 'Objects', id },
    //     //                 { type: 'Objects', id: 'LIST' }]
    //     //     }
    //     // },
    // }),
  }),
})

const {updateQueryData} = apiSlice.util

export const {
  // useGetObjectsQuery,
  // useGetObjectQuery,
  // useCreateObjectMutation,
  // useUpdateObjectMutation,
  // useDeleteObjectMutation,
} = apiSlice

// export const {getObjects} = apiSlice.endpoints

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
