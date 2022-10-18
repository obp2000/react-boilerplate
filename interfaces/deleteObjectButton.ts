import {
  useDeleteCustomerMutation
} from '../src/components/customers/apiSlice'
import {
  useDeleteProductMutation
} from '../src/components/products/apiSlice'
import {
  useDeleteOrderMutation
} from '../src/components/orders/apiSlice'
import { AnyObject } from './api'

export type DeleteObjectButtonType = {
  useDeleteObjectMutation: typeof useDeleteCustomerMutation |
  typeof useDeleteProductMutation |
  typeof useDeleteOrderMutation
  object: AnyObject
}
