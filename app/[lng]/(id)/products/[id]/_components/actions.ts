'use server'

import 'server-only'

import { assert } from 'superstruct'
import { revalidatePath } from 'next/cache'

import { struct } from './struct'
import { prisma } from '@/services/prisma'
import { getDictionary } from '@/app/i18n/dictionaries'

import type { ServerActionResult } from '@/interfaces/form'

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
	const data = {
		productTypeId: formData.get('productTypeId')
			? Number(formData.get('productTypeId'))
			: null,
		threads: formData.get('threads')
			? Number(formData.get('threads'))
			: null,
		contents: formData.get('contents')
			? Number(formData.get('contents'))
			: null,
		fleece: formData.get('fleece')
			? Boolean(formData.get('fleece'))
			: null,
		name: formData.get('name'),
		price: Number(formData.get('price')),
		dollarPrice: formData.get('dollarPrice')
			? Number(formData.get('dollarPrice'))
			: null,
		dollarRate: formData.get('dollarRate')
			? Number(formData.get('dollarRate'))
			: null,
		weight: formData.get('weight')
			? Number(formData.get('weight'))
			: null,
		width: formData.get('width')
			? Number(formData.get('width'))
			: null,
		density: formData.get('density')
			? Number(formData.get('density'))
			: null,
		widthShop: formData.get('widthShop')
			? Number(formData.get('widthShop'))
			: null,
		densityShop: formData.get('densityShop')
			? Number(formData.get('densityShop'))
			: null,
		weightForCount: formData.get('weightForCount')
			? Number(formData.get('weightForCount'))
			: null,
		lengthForCount: formData.get('lengthForCount')
			? Number(formData.get('lengthForCount'))
			: null,
		pricePre: formData.get('pricePre')
			? Number(formData.get('pricePre'))
			: null,
		image: formData.get('image') || '',
	}
	console.log('data ', data)
	assert(data, struct)
	if (id) {
		await prisma.product.update({
			where: { id },
			data
		})
	} else {
		await prisma.product.create({
			data
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
	revalidatePath(`/[lng]/${table}`)
	return { success: true, message }
}
