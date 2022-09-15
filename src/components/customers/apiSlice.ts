import { objectToFormData } from 'object-to-formdata'
import { apiSlice } from '../../services/apiSlice'
import {
  setAll,
  objectsInitialState,
  ObjectsWithTotals,
} from '../../services/entityAdapter'
import {
  Customer as GetObject,
  CustomerFormValues as ObjectFormValues,
  RawObjectsWithTotals,
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

const url = '/customers/'

const type = 'Customers'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<ObjectsWithTotals, GetObjectsArg>({
      query: (params) => ({ url, params }),
      // transformResponse: ({
      //   results,
      //   ...rest
      // }: RawObjectsWithTotals) => ({
      //   ...setAll(objectsInitialState, results),
      //   ...rest
      // }),
      transformResponse: ({
        results,
        totalCount,
        totalPages,
      }: RawObjectsWithTotals) =>
      ({
        ...setAll(objectsInitialState, results),
        totalCount,
        totalPages,
      }),
      providesTags: (result) =>
        result
          ? [...result.ids.map((id) => ({ type, id })), { type, id: 'LIST' },]
          : [{ type, id: 'LIST' }],
    }),
    getCustomer: builder.query<GetObject, GetObjectArg>({
      query: ({ id }) => ({ url: `${url}${id}/` }),
      providesTags: (_, __, { id }) => [{ type, id }],
    }),
    createCustomer: builder.mutation<GetObject, MutateObjectArg>({
      query: ({ toFormData, ...values }) => ({
        url,
        method: 'POST',
        body: toFormData ? objectToFormData(values) : values,
      }),
      invalidatesTags: [{ type, id: 'LIST' }],
    }),
    updateCustomer: builder.mutation<GetObject, MutateObjectArg>({
      query: ({ id, toFormData, ...values }) => ({
        url: `${url}${id}/`,
        method: 'PUT',
        body: toFormData ? objectToFormData(values) : values,
      }),
      onQueryStarted({ id, toFormData, ...values },
        { dispatch, queryFulfilled }) {
        const { undo } = dispatch(
          extendedApiSlice.util.updateQueryData(
            'getCustomer',
            { id },
            (draftObject) => ({ ...draftObject, ...values })
          )
        )
        queryFulfilled.catch(undo)
      },
      invalidatesTags: (_, __) => [{ type, id: 'LIST' }],
    }),
    deleteCustomer: builder.mutation<void, DeleteObjectArg>({
      query: ({ id }) => ({
        url: `${url}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, { id }) => [{ type, id }, { type, id: 'LIST' }],
    }),
  }),
})

export const {
  useGetCustomerQuery,
  useLazyGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = extendedApiSlice

export const { getCustomers, getCustomer } = extendedApiSlice.endpoints


// export const extendedApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getCustomers: builder.query<GetObjects, GetObjectsArg>(getObjectsQuery(url, type)),
//     getCustomer: builder.query<Customer, GetObjectArg>(getObjectQuery(url, type)),
//     createCustomer: builder.mutation(createObjectMutation(url, type)),
//     updateCustomer: builder.mutation(updateObjectMutation(url, type)),
//     deleteCustomer: builder.mutation(deleteObjectMutation(url, type)),
//   }),
// })
