import {objectToFormData} from 'object-to-formdata'
import {apiSlice} from '../../services/apiSlice'
import {setAll, objectsInitialState} from '../../services/entityAdapter'
import {
  getObjectsQuery,
  getObjectQuery,
  createObjectMutation,
  updateObjectMutation,
  deleteObjectMutation,
} from '../../services/objectQueries'

const url = '/customers/'

const type = 'Customers'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query(getObjectsQuery(url, type)),
    getCustomer: builder.query(getObjectQuery(url, type)),
    createCustomer: builder.mutation(createObjectMutation(url, type)),
    updateCustomer: builder.mutation(updateObjectMutation(url, type)),
    deleteCustomer: builder.mutation(deleteObjectMutation(url, type)),
  }),
})

export const {
  useGetCustomerQuery,
  useLazyGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = extendedApiSlice

export const {getCustomers, getCustomer} = extendedApiSlice.endpoints
