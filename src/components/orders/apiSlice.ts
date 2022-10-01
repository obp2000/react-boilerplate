import { apiSlice } from '../../services/apiSlice'
import { indexUrl as url } from './hooks'
import { setAll, objectsInitialState, } from '../../services/entityAdapter'
import {
  Order as GetObject,
  OrderFormValues as ObjectFormValues,
  RawObjectsWithTotals,
  ObjectsWithTotals,
  OrderItemFormValues,
} from '../../../interfaces'

type GetObjectsArg = {
  params?: Object
}

type GetObjectArg = {
  id?: number
}

type DeleteObjectArg = {
  id: number
}

const type = 'Orders'

const orderItemsMod = (orderItems: OrderItemFormValues[]) => orderItems.map(({
  product,
  cost,
  weight,
  _destroy,
  ...orderItem
}) => {
  if (product) {
    orderItem.product_id = product.id
  }
  return orderItem
})

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<ObjectsWithTotals, GetObjectsArg>({
      query: (params) => ({ url, params }),
      transformResponse: ({ results, ...rest }: RawObjectsWithTotals) => ({
        ...setAll(objectsInitialState, results),
        ...rest
      }),
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
          [
            ...result.ids.map((id) => ({ type, id } as const)),
            { type, id: 'LIST' },
          ]
          : [{ type, id: 'LIST' }],
    }),
    createOrder: builder.mutation<GetObject, ObjectFormValues>({
      query: ({
        id,
        customer,
        samples_weight,
        packet_weight,
        gift_weight,
        order_items_amount,
        order_items_cost,
        order_items_weight,
        created_at,
        updated_at,
        consts,
        post_cost_with_packet,
        post_discount,
        total_postals,
        total_sum,
        total_weight,
        ...values
      }) => {
        if (customer) {
          values.customer_id = customer.id
        }
        if (values.order_items) {
          values.order_items = orderItemsMod(values.order_items)
        }
        return {
          url,
          method: 'POST',
          body: values,
        }
      },
      invalidatesTags: [{ type, id: 'LIST' }],
    }),
    getOrder: builder.query<GetObject, GetObjectArg>({
      query: ({ id }) => ({ url: `${url}${id}/` }),
      // providesTags: (_, __, { id }) => [{ type, id }],
    }),
    updateOrder: builder.mutation<GetObject, ObjectFormValues>({
      query: ({
        id,
        customer,
        samples_weight,
        packet_weight,
        gift_weight,
        order_items_amount,
        order_items_cost,
        order_items_weight,
        created_at,
        updated_at,
        // order_items: orderItems,
        consts,
        post_cost_with_packet,
        post_discount,
        total_postals,
        total_sum,
        total_weight,
        ...values
      }) => {
        if (customer) {
          values.customer_id = customer.id
        }
        if (values.order_items) {
          values.order_items = orderItemsMod(values.order_items)
        }
        return {
          url: `${url}${id}/`,
          method: 'PUT',
          body: values,
        }
      },
      onQueryStarted(patch, { dispatch, queryFulfilled }) {
        // const endpointName = `get${type.slice(0, -1)}` as QueryKeys
        patch.updated_at = new Date().toISOString()
        const { undo } = dispatch(
          extendedApiSlice.util.updateQueryData(
            'getOrder',
            { id: patch.id },
            (draft) => Object.assign(draft, patch)
          )
        )
        queryFulfilled.catch(undo)
      },
      invalidatesTags: (_result, _error, { id }) => [{ type, id }],
    }),
    deleteOrder: builder.mutation<void, DeleteObjectArg>({
      query: ({ id }) => ({
        url: `${url}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type, id }],
    }),
  }),
})

export const {
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = extendedApiSlice

export const { getOrders, getOrder } = extendedApiSlice.endpoints


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