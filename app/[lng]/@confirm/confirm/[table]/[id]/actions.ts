'use server'

import 'server-only'

import { revalidatePath } from 'next/cache'

import { getPrismaClient } from '@/app/_objects/ObjectPage'
import { getDictionary } from '@/app/i18n/dictionaries'

import type { ServerActionResult } from '@/interfaces/form'

export async function remove({
	lng,
	table,
	id,
}: {
	lng: string
	table: string
	id: number
}): Promise<ServerActionResult> {
	await getPrismaClient(table).delete({
		where: { id },
	})
	const {
		[table as 'customers' | 'products' | 'orders']: {
			singular
		},
		successfully,
		deleted,
	} = await getDictionary(lng)
	const message = `${singular} ${successfully.toLowerCase()} ${deleted}`
	// revalidatePath('/')
	revalidatePath(`/[lng]/${table}`)
	return { success: true, message }
}
