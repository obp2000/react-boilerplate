import 'server-only'

import type { Translation } from '@/app/i18n/dictionaries'
import prisma from "@/services/prisma"
import tables from '@/app/objectPage/tables.json'

export function labels({ product: labels }: Translation) {
	return {
		labels,
	}
}

export async function getOptions() {
	const productTypes = await prisma.productType.findMany({
		select: tables.products.select.objects.productType.select
	})
	return { productTypes }
}
