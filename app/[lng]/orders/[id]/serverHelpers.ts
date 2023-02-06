import 'server-only'

import prisma from "@/services/prisma"
import select from './select.json'
import type { Order } from './helpers'
import { formInitialOrderItems } from './orderItems/serverHelpers'
import {
	orderItemsAmount,
	orderItemsCost,
	orderItemsWeight,
	postCostWithPacket,
	postDiscount,
	totalPostals,
	totalSum,
	totalWeight,
	type Values
} from './calculator'
import consts from './consts.json'
import type { Translation } from '@/app/i18n/dictionaries'

export async function getObject(id: number) {
	return await prisma.order.findUniqueOrThrow({
		where: {
			id,
		},
		select,
	})
}

export function getInitialValues({ object }: { object?: Order }): Values {
	let { created_at, orderItems, ...rest } = object ?? {}
	let objectValues = {
		...rest,
		orderItems: formInitialOrderItems(orderItems),
	} as Values
	objectValues = {
		...objectValues,
		samples_weight: consts.SAMPLES_WEIGHT,
		packet_weight: consts.PACKET_WEIGHT,
		gift_weight: consts.GIFT_WEIGHT,
		order_items_amount: orderItemsAmount(null, objectValues),
		order_items_cost: orderItemsCost(null, objectValues),
		order_items_weight: orderItemsWeight(null, objectValues),
	}
	objectValues = {
		...objectValues,
		post_cost_with_packet: postCostWithPacket(null, objectValues),
		post_discount: postDiscount(null, objectValues),
		total_postals: totalPostals(null, objectValues),
	}
	return {
		...objectValues,
		total_sum: totalSum(null, objectValues),
		total_weight: totalWeight(null, objectValues),
	}
}

export function labels({
	add,
	delete: textDelete,
	not_found: notFound,
	count,
	order: labels,
	yes: okText,
	no: cancelText,
	customer: customerLabels,
	product: productLabels,
}: Translation) {
	return {
		add,
		textDelete,
		notFound,
		count,
		labels,
		label: textDelete,
		okText,
		cancelText,
		customerLabels,
		productLabels,
	}
}

export async function options() {
	return {}
}
