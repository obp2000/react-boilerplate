'use server'

import 'server-only'

import { assert } from 'superstruct'
import { revalidatePath } from 'next/cache'

import { structApi } from './struct'
import { prisma } from '@/services/prisma'
import { getDictionary } from '@/app/i18n/dictionaries'

import type { ServerActionResult } from '@/interfaces/form'
import type {
	NewOrderItem,
	OrderItemUpdate
} from '@/interfaces/orders'

export async function mutate({
	formData,
	lng,
	id,
	table,
}: {
	formData: FormData
	lng: string
	id?: number
	table: string
}): Promise<ServerActionResult> {
	// console.log('test1...........', formData)
	const {
		customerId,
		deliveryType,
		address,
		gift,
		packet,
		postCost: rawPostCost,
		...rawObject
	} = Object.fromEntries(formData.entries())
	const rawOrderItems: Array<Record<string, FormDataEntryValue>> = []
	Object.keys(rawObject).map((rawKey) => {
		if (rawKey.startsWith('orderItems')) {
			const [_, index, key] = rawKey.split('.')
			if (rawOrderItems[Number(index)]) {
				rawOrderItems[Number(index)][key] = rawObject[rawKey]
			} else {
				rawOrderItems.push({ [key]: rawObject[rawKey] })
			}
		}
	})
	const postCost = rawPostCost ? Number(rawPostCost) : null
	const orderItems = rawOrderItems.map(({
		id,
		productId,
		amount,
		price
	}) => {
		return {
			id: id ? Number(id) : undefined,
			productId: productId ? Number(productId) : null,
			amount: amount ? Number(amount) : null,
			price: price ? Number(price) : null,
		}
	})
	// console.log('orderItems ', orderItems)
	const data = {
		customerId: Number(customerId),
		deliveryType: deliveryType
			? Number(deliveryType)
			: null,
		address: address ? String(address) : undefined,
		gift: gift ? String(gift) : undefined,
		packet: packet
			? Number(packet)
			: null,
	}
	assert({ postCost, orderItems, ...data }, structApi)
	if (id) {
		const object = await prisma.order.findUnique({
			where: { id },
			include: { orderItems: true }
		})
		const { newOrderItems, updateOrderItems, deletedOrderItemIds } =
			orderItems.reduce(
				({
					newOrderItems,
					updateOrderItems,
					deletedOrderItemIds
				}: {
					newOrderItems: NewOrderItem[]
					updateOrderItems: OrderItemUpdate[]
					deletedOrderItemIds: number[]
				},
					{ id, ...data }) => {
					if (id) {
						const index = deletedOrderItemIds.indexOf(id)
						if (index > -1) {
							deletedOrderItemIds.splice(index, 1)
						}
						updateOrderItems.push({
							where: { id },
							data
						})
					}
					else {
						newOrderItems.push(data)
					}
					return {
						newOrderItems,
						updateOrderItems,
						deletedOrderItemIds
					}
				}, {
				newOrderItems: [],
				updateOrderItems: [],
				deletedOrderItemIds: object?.orderItems.map(({ id }) => id) || []
			})
		await prisma.$transaction(
			[prisma.order.update({
				where: { id: Number(id) },
				data: {
					...data,
					postCost: postCost as number,
					orderItems: {
						create: newOrderItems,
						deleteMany: {
							id: {
								in: deletedOrderItemIds
							}
						},
					}
				}
			}),
			...updateOrderItems.map((orderItem) =>
				prisma.orderItem.update(orderItem))
			]
		)
	} else {
		await prisma.order.create({
			data: {
				...data,
				postCost: postCost as number,
				orderItems: { create: orderItems }
			}
		})
	}
	const {
		[table as 'customers' | 'products' | 'orders']: {
			singular
		},
		successfully,
		created,
		updated,
	} = await getDictionary(lng)
	const message =
		`${singular} ${successfully.toLowerCase()} ${id ? updated : created}`
	// revalidatePath('/')
	revalidatePath(`/[lng]/${table}`)
	return { success: true, message }
}
