import { struct } from '@/app/user/struct'
import prisma from '@/services/prisma'
import { Prisma } from '@prisma/client'
import { hash } from "argon2"
import { Conflict, type HttpError } from 'http-errors'
import { NextResponse } from "next/server"
import { create } from 'superstruct'

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { password1, password2, ...input } = create(body, struct)
		const password = await hash(password1)
		const data = {
			...input,
			lastLogin: new Date(),
			dateJoined: new Date(),
			isSuperuser: false,
			isStaff: false,
			isActive: true,
			password,
		}
		try {
			const user = await prisma.user.create({ data })
			return NextResponse.json(user)
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					throw Conflict('nameAlreadyExists')
				}
			}
			throw e
		}

	} catch (e) {
		const { statusCode, message } = e as HttpError
		return NextResponse.json({  message	}, { status: statusCode })
	}
}
