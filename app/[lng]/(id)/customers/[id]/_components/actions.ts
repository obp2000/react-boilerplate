'use server'

import 'server-only'

import { structApi } from '@/app/api/customers/struct'
// import { toastSuccess } from '@/app/components/toast'
import { prisma } from '@/services/prisma'
import { assert } from 'superstruct'
import { fallbackLng } from '@/app/i18n/settings'
import { redirect } from 'next/navigation'

export async function mutate({
	formData,
	params: {
		lng = fallbackLng,
		id,
	},
	table,
}: {
	formData: FormData
	params: {
		lng: string
		id: string
	},
	table: string
}) {
	const data = {
		nick: formData.get('nick'),
		name: formData.get('name'),
		cityId: Number(formData.get('cityId')),
		address: formData.get('address'),
	}
	console.log('data ', data)
	assert(data, structApi)
	if (id === 'new') {
		await prisma.customer.create({
			data
		})
	} else {
		await prisma.customer.update({
			where: { id: Number(id) },
			data
		})
	}
	redirect(`/${lng}/success/${table}/${id}`)
}

// export async function handleSubmit(formData: FormData) {
// 	const id = formData.get('id')
// 		? Number(formData.get('id'))
// 		: undefined
// 	const data = {
// 		nick: formData.get('nick'),
// 		name: formData.get('name'),
// 		cityId: Number(formData.get('cityId')),
// 		address: formData.get('address'),
// 	}
// 	console.log('data ', data)
// 	assert(data, structApi)
// 	if (id) {
// 		await prisma.customer.update({
// 			where: { id },
// 			data
// 		})
// 	} else {
// 		await prisma.customer.create({
// 			data
// 		})
// 	}
// 	// toastSuccess('success')
// }
