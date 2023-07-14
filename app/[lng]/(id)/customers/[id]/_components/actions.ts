'use server'

import 'server-only'

import { assert } from 'superstruct'
import { revalidatePath } from 'next/cache'

import { structApi } from './struct'
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
		nick: formData.get('nick'),
		name: formData.get('name'),
		cityId: Number(formData.get('cityId')),
		address: formData.get('address'),
	}
	console.log('data ', data)
	assert(data, structApi)
	if (id) {
		await prisma.customer.update({
			where: { id },
			data
		})
	} else {
		await prisma.customer.create({
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
