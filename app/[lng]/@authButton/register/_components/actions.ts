'use server'

import 'server-only'

import { assert } from 'superstruct'
import { hash } from 'argon2'

import { struct } from './struct'
import { prisma } from '@/services/prisma'
import { getDictionary } from '@/app/i18n/dictionaries'

import type { ServerActionResult } from '@/interfaces/form'

export async function create({
	formData,
	lng,
}: {
	formData: FormData
	lng: string
}): Promise<ServerActionResult> {
	const data = {
		name: formData.get('name'),
		email: formData.get('email'),
		password1: formData.get('password1'),
		password2: formData.get('password2'),
		firstName: formData.get('firstName') ?? undefined,
		lastName: formData.get('lastName') ?? undefined,
	}
	// console.log('data ', data)
	assert(data, struct)
	const { name, password1, password2, ...input } = data
	const exists = await prisma.user.findUnique({
		where: {
			name,
		},
	})
	const {
		auth: {
			successfulRegister,
			nameAlreadyExists,
		},
	} = await getDictionary(lng)
	if (exists) {
		// throw new Error(nameAlreadyExists)
		// return NextResponse.json({
		// 	error: auth.nameAlreadyExists }, { status: 400 })
		return { success: false, error: nameAlreadyExists }
	}
	await prisma.user.create({
		data: {
			...input,
			name,
			password: await hash(password1),
		}
	})
	const message = successfulRegister
	// revalidatePath('/')
	// revalidatePath(`/[lng]/(id)/${table}/[id]`)
	return { success: true, message }
}
