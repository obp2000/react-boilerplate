// import type { FormProps, FormRenderProps } from 'react-final-form'
import type { Decorator, Mutator } from 'final-form'
import type { IndexUrl } from '.'
import type { Customer, CustomerWithOptions } from './customers'
import type { Product, ProductWithOptions } from './products'
import type { Order, OrderWithOptions } from './orders'
// import type { CommonConstsType } from './commonConsts'
import type { AnyObjectType } from './api'
// import type { AnyOptionsType, AnyObjectOptionsType } from './options'
// import {
//   getCustomers,
//   useGetCustomerQuery,
//   useCreateCustomerMutation,
//   useUpdateCustomerMutation,
//   useDeleteCustomerMutation,
// } from '../src/components/customers/apiSlice'
// import {
//   getProducts,
//   useGetProductQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
// } from '../src/components/products/apiSlice'
// import {
//   getOrders,
//   useCreateOrderMutation,
//   useDeleteOrderMutation,
//   useGetOrderQuery,
//   useUpdateOrderMutation
// } from '../src/components/orders/apiSlice'
// import {
//   validate as customerValidate
// } from '../src/components/customers/validators'
// import {
//   validate as productValidate
// } from '../src/components/products/validators'
// import {
//   validate as orderValidate
// } from '../src/components/orders/validators'
// import customerFormRender from '../src/components/customers/CustomerFormRender'
// import productFormRender from '../src/components/products/ProductFormRender'
// import orderFormRender from '../src/components/orders/OrderFormRender'
// import {
//   formInitialValues as customerFormInitialValues
// } from '../src/components/customers/config'
// import {
//   formInitialValues as productFormInitialValues
// } from '../src/components/products/config'
// import {
//   formInitialValues as orderFormInitialValues
// } from '../src/components/orders/config'

export type AnyObjectFormValues = Partial<Customer> | Partial<Product> |
  Partial<Order>

export type IsCalculatedFields = {
  fields?: { [index: string]: boolean }
  calculatedFields?: string[]
}

export type SubmitButtonProps = {
  isLoadingOptions?: boolean
  isFetchingOptions?: boolean
  text?: string
  className?: string
  isLoading?: boolean
  calculatedFields?: string[]
}

export type HeaderProps = AnyObjectType & SubmitButtonProps

// export type FormConfig = IndexUrl & {
//   useGetObjectQuery: typeof useGetCustomerQuery | typeof useGetProductQuery |
//     typeof useGetOrderQuery
//   formInitialValues: typeof customerFormInitialValues |
//     typeof productFormInitialValues | typeof orderFormInitialValues
//   formDecorators?: Decorator[]
//   mutators?: { [index: string]: Mutator }
//   validate: typeof customerValidate | typeof productValidate |
//     typeof orderValidate
//   useUpdateObjectMutation: typeof useUpdateCustomerMutation |
//     typeof useUpdateProductMutation | typeof useUpdateOrderMutation
//   useCreateObjectMutation: typeof useCreateCustomerMutation |
//     typeof useCreateProductMutation | typeof useCreateOrderMutation
//   objectFormRender: typeof customerFormRender | typeof productFormRender |
//     typeof orderFormRender
//   calculatedFields: string[]
// }

// export type FormConfigC = IndexUrl & {
//   useGetObjectQuery: typeof useGetCustomerQuery
//   formInitialValues: CustomerWithOptions
//   validate: typeof validate
//   useUpdateObjectMutation: typeof useUpdateCustomerMutation
//   useCreateObjectMutation: typeof useCreateCustomerMutation
//   objectFormRender: typeof objectFormRender
// }

// export type FormConfigP = IndexUrl & {
//   useGetObjectQuery: typeof useGetProductQuery
//   formInitialValues: ProductWithOptions
//   formDecorators: Decorator[]
//   validate: typeof customerValidate | typeof productValidate |
//     typeof orderValidate
//   useUpdateObjectMutation: typeof useUpdateProductMutation
//   useCreateObjectMutation: typeof useCreateProductMutation
//   objectFormRender: typeof objectFormRender
//   calculatedFields: string[]
// }





