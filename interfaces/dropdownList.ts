import type { FieldRenderProps } from 'react-final-form'
import type { DropdownProps } from 'react-widgets/cjs/DropdownList'
import type { Customer } from '@/app/[lng]/customers/helpers'
import type { Product } from '@/app/[lng]/products/helpers'
import type { City } from '@/app/[lng]/customers/cities/helpers'

export type DropdownFieldValue = City |	Customer | Product | undefined

export type TDataItem = City | Customer | Product

export type DropdownFieldRenderProps =
	FieldRenderProps<DropdownFieldValue> & DropdownProps<TDataItem>
