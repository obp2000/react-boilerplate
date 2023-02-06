import type { Values as CustomerValues } from '@/app/[lng]/customers/[id]/calculator'
import type { Values as ProductValues } from '@/app/[lng]/products/[id]/calculator'
import type { Values as OrderValues } from '@/app/[lng]/orders/[id]/calculator'
import { FieldRenderProps } from 'react-final-form'
import { LoginValues } from '@/auth/LoginForm'
import { RegisterValues } from '@/auth/RegisterForm'
import { OrderItem } from '@prisma/client'

export type inputFieldValue = CustomerValues['nick'] | CustomerValues['name'] | CustomerValues['address'] |
	Pick<ProductValues, 'name' | 'dollar_price' | 'dollar_rate' | 'width' |
		'density' | 'price' | 'image' | 'weight_for_count' | 'length_for_count' |
		'weight' | 'price_pre' | 'width_shop' | 'density_shop'> |
	Pick<OrderValues, 'address' | 'gift' | 'post_cost'> |
	Pick<OrderItem, 'amount' | 'price'> |
	Pick<LoginValues, 'username'> |
	Pick<LoginValues, 'password'> |
	Pick<RegisterValues, 'username'> |
	Pick<RegisterValues, 'email'> |
	Pick<RegisterValues, 'first_name'> |
	Pick<RegisterValues, 'last_name'> |
	Pick<RegisterValues, 'password1'> |
	Pick<RegisterValues, 'password2'> | undefined

export type switchFieldValue = Pick<ProductValues, 'fleece'>

export type InputFieldRenderProps =
	FieldRenderProps<inputFieldValue | switchFieldValue>
