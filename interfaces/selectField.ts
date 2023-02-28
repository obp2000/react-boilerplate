import type { Values as ProductValues } from '@/app/products/calculator'
import type { Values as OrderValues } from '@/app/orders/calculator'
// import { FieldRenderProps } from 'react-final-form'

export type SelectFieldValue =
	Pick<ProductValues, 'product_type_id' | 'contents' | 'threads'> |
	Pick<OrderValues, 'delivery_type' | 'packet'>

// export type SelectFieldRenderProps =
//   Omit<FieldRenderProps<SelectFieldValue, HTMLSelectElement>, 'input' | 'meta'>
export type SelectFieldRenderProps = SelectFieldValue