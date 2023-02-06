import 'server-only'

import prisma from "@/services/prisma"
import select from './select.json'
import type { Customer } from './helpers'
import type { Values } from './calculator'
import type { Translation } from '@/app/i18n/dictionaries'

export async function getObject(id: number) {
	return await prisma.customer.findUniqueOrThrow({
		where: {
			id,
		},
		select,
	})
}

export function getInitialValues({ object }: { object?: Customer }): Values {
	const { created_at, ...rest } = object || {}
	let objectValues = rest as Values
	return objectValues
}

export function labels({ not_found: notFound, customer: labels }: Translation) {
	return {
		notFound,
		labels,
	}
}

export async function options() {
	return {}
}
