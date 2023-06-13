import { getDictionary } from '@/app/i18n/dictionaries'
import { struct } from '@/app/user/struct'
import { prisma } from '@/services/prisma'
import { hash } from "argon2"
import { type NextRequest, NextResponse } from "next/server"
import { create } from 'superstruct'

export async function POST(request: NextRequest,
	{ params: { lng } }: {
		params: { lng: string }
	}) {
	const { name, password1, password2, ...input } =
		create(await request.json(), struct)
	const exists = await prisma.user.findUnique({
		where: {
			name,
		},
	})
	if (exists) {
		const { auth } = await getDictionary(lng)
		return NextResponse.json({
			error: auth.nameAlreadyExists }, { status: 400 })
	}
	const user = await prisma.user.create({
		data: {
			...input,
			name,
			password: await hash(password1),
		}
	})
	return NextResponse.json(user)
}
