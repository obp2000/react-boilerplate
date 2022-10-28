import { useDeleteCustomerMutation } from '../components/customers/apiSlice'
import { useDeleteOrderMutation } from '../components/orders/apiSlice'
import { useDeleteProductMutation } from '../components/products/apiSlice'
import { AnyObject } from './api'

export type DeleteObjectButtonType = {
  useDeleteObjectMutation: typeof useDeleteCustomerMutation |
  typeof useDeleteProductMutation |
  typeof useDeleteOrderMutation
  object: AnyObject
}
