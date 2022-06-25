import { objectToFormData } from 'object-to-formdata'
import { apiSlice } from '../../services/apiSlice'
import { setAll, objectsInitialState } from '../../services/entityAdapter'
import {
    getObjectsQuery,
    getObjectQuery,
    createObjectMutation,
    updateObjectMutation,
    deleteObjectMutation,
} from '../../services/objectQueries'

const url = '/orders/'

const type = 'Orders'

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query(getObjectsQuery(url, type)),
        getOrder: builder.query(getObjectQuery(url, type)),
        createOrder: builder.mutation(createObjectMutation(url, type)),
        updateOrder: builder.mutation(updateObjectMutation(url, type)),
        deleteOrder: builder.mutation(deleteObjectMutation(url, type)),
    })
})

export const {
    useGetOrderQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = extendedApiSlice

export const {getOrders} = extendedApiSlice.endpoints
