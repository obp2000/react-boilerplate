import type { CustomerFormValues } from './customers'
import type { ProductFormValues } from './products'
import type { OrderFormValues } from './orders'
import type { AnyObjectType } from './api'
import {
  LoginFormValues,
  RegisterFormValues
} from './auth'

export type AnyObjectFormValues = CustomerFormValues | ProductFormValues |
  OrderFormValues

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

export type AnyFormValues = CustomerFormValues | ProductFormValues |
  OrderFormValues | LoginFormValues | RegisterFormValues



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





