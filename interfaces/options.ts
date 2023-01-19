import customerOptions from '@/app/[lng]/customers/[id]/options.json'
import orderOptions from '@/app/[lng]/orders/[id]/options.json'
import orderItemOptions from '@/app/[lng]/orders/[id]/orderItems/options.json'
import productOptions from '@/app/[lng]/products/[id]/options.json'
import userOptions from '@/app/[lng]/user/options.json'
import loginOptions from '@/auth/login.json'
import registerOptions from '@/auth/register.json'
// import { PropsWithChildren } from 'react'

// export type AnyChoices = Pick<typeof productOptions['product_type_id'], 'choices'> |
//   Pick<typeof productOptions['threads'], 'choices'> |
//   Pick<typeof productOptions['contents'], 'choices'> |
//   Pick<typeof orderOptions['packet'], 'choices'> |
//   Pick<typeof orderOptions['delivery_type'], 'choices'>

export type TableOptions = Omit<typeof customerOptions, 'name_singular' | 'name_plural'> |
  Omit<typeof productOptions, 'name_singular' | 'name_plural'> |
  Omit<typeof orderOptions, 'name_singular' | 'name_plural' | 'customer' | 'order_items'>

export type AnyOptions = TableOptions | Omit<typeof userOptions, 'name_singular'> |
  typeof loginOptions | typeof registerOptions | typeof orderItemOptions
  // Omit<typeof orderOptions, 'customer' | 'order_items'>
// OrderItemOptionsPartial

export type AnyOptionsType = {
  options?: AnyOptions
}

