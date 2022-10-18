import { apiSlice } from '../../services/apiSlice'
import { indexUrl as url } from './config'
import { setAll, objectsInitialState } from '../../services/entityAdapter'
import type { Customer } from '../../../interfaces/customers'
import type {
  GetObjectsArg,
  RawObjectsWithTotals,
  ObjectsWithTotals,
} from '../../../interfaces/api'

const type = 'Customers'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<ObjectsWithTotals, GetObjectsArg>({
      query: (params) => ({ url, params }),
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
        // is result available?
        result
          ? // successful query
          [
            ...result.ids.map((id) => ({ type, id } as const)),
            { type, id: 'LIST' },
          ]
          : // an error occurred, but we still want to refetch this query when
          // `{ type: 'Customers', id: 'LIST' }` is invalidated
          [{ type, id: 'LIST' }],
    }),
    createCustomer: builder.mutation<Customer, Customer>({
      query: ({
        id,
        city,
        created_at,
        updated_at,
        ...values
      }) => {
        if (city) {
          values.city_id = city.id
        }
        return {
          url,
          method: 'POST',
          body: values,
        }
      },
      // Invalidates all Customer-type queries providing the `LIST` id -
      // after all, depending of the sort order,
      // that newly created customer could show up in any lists.
      invalidatesTags: [{ type, id: 'LIST' }],
    }),
    getCustomer: builder.query<Customer, { id: number }>({
      query: ({ id }) => ({ url: `${url}${id}/` }),
      // providesTags: (result, error, { id }) => [{ type: 'Customers', id }],
    }),
    updateCustomer: builder.mutation<Customer, Customer>({
      query: ({
        id,
        city,
        created_at,
        updated_at,
        ...values
      }) => {
        if (city) {
          values.city_id = city.id
        }
        return {
          url: `${url}${id}/`,
          method: 'PUT',
          body: values,
        }
      },
      onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        // console.log({ patch })
        patch.updated_at = new Date().toISOString()
        const { undo } = dispatch(
          extendedApiSlice.util.updateQueryData(
            'getCustomer',
            { id },
            (draft) => Object.assign(draft, patch)
          )
        )
        queryFulfilled.catch(undo)
      },
      // Invalidates all queries that subscribe to this Customer `id` only.
      // In this case, `getCustomer` will be re-run. `getCustomers` *might*
      // rerun, if this id was under its results.
      invalidatesTags: (_result, _error, { id }) => [{ type, id }],
    }),
    deleteCustomer: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `${url}${id}`,
        method: 'DELETE',
      }),
      // Invalidates all queries that subscribe to this Customer `id` only.
      invalidatesTags: (_result, _error, { id }) => [{ type, id }],
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
