import {objectToFormData} from 'object-to-formdata'
import {apiSlice} from '../../services/apiSlice'
import {
  setAll,
  objectsInitialState,
  ObjectsWithTotals,
  RawObjectsWithTotals
} from '../../services/entityAdapter'
import {
  Order as GetObject,
  OrderFormValues as ObjectFormValues
} from '../../../interfaces'

type GetObjectsArg = {
  params?: Object
}

type GetObjectArg = {
  id?: number
}

type MutateObjectArg = ObjectFormValues & {
  toFormData?: boolean
}

type DeleteObjectArg = {
  id: number
}

const url = '/orders/'

const type = 'Orders'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<ObjectsWithTotals, GetObjectsArg>({
      query: (params) => ({ url, params }),
      transformResponse: ({results, ...rest}: RawObjectsWithTotals) => ({
        ...setAll(objectsInitialState, results),
        ...rest
      }),
      providesTags: (result) =>
        result
          ? [...result.ids.map((id) => ({ type, id })), { type, id: 'LIST' },]
          : [{ type, id: 'LIST' }],
    }),
    getOrder: builder.query<GetObject, GetObjectArg>({
      query: ({ id }) => ({ url: `${url}${id}/` }),
      providesTags: (_, __, { id }) => [{ type, id }],
    }),
    createOrder: builder.mutation<GetObject, MutateObjectArg>({
      query: ({toFormData, ...values}) => ({
        url,
        method: 'POST',
        body: toFormData ? objectToFormData(values) : values,
      }),
      invalidatesTags: [{type, id: 'LIST'}],
    }),
    updateOrder: builder.mutation<GetObject, MutateObjectArg>({
      query: ({id, toFormData, ...values}) => ({
        url: `${url}${id}/`,
        method: 'PUT',
        body: toFormData ? objectToFormData(values) : values,
      }),
      onQueryStarted({id, toFormData, ...values},
        {dispatch, queryFulfilled}) {
        // const endpointName = `get${type.slice(0, -1)}` as QueryKeys
        const {undo} = dispatch(
          extendedApiSlice.util.updateQueryData(
            'getOrder',
            {id},
            (draftObject) => ({...draftObject, ...values})
          )
        )
        queryFulfilled.catch(undo)
      },
      invalidatesTags: (_, __) => [{type, id: 'LIST'}],
    }),
    deleteOrder: builder.mutation<void, DeleteObjectArg>({
      query: ({id}) => ({
        url: `${url}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, {id}) => [{type, id}, {type, id: 'LIST'}],
    }),
  }),
})

export const {
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = extendedApiSlice

export const {getOrders, getOrder} = extendedApiSlice.endpoints


// import {objectToFormData} from 'object-to-formdata'
// import {apiSlice} from '../../services/apiSlice'
// import {setAll, objectsInitialState} from '../../services/entityAdapter'
// import {
//   getObjectsQuery,
//   getObjectQuery,
//   createObjectMutation,
//   updateObjectMutation,
//   deleteObjectMutation,
// } from '../../services/objectQueries'

// const url = '/orders/'

// const type = 'Orders'

// export const extendedApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getOrders: builder.query(getObjectsQuery(url, type)),
//     getOrder: builder.query(getObjectQuery(url, type)),
//     createOrder: builder.mutation(createObjectMutation(url, type)),
//     updateOrder: builder.mutation(updateObjectMutation(url, type)),
//     deleteOrder: builder.mutation(deleteObjectMutation(url, type)),
//   }),
// })