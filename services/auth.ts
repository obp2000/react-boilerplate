import { Prisma, User } from '@prisma/client'
import { compareSync } from 'bcryptjs'
import { NotFound, Unauthorized } from 'http-errors'
import { signAccessToken } from './jwt'
import prisma from './prisma'

export async function register(data: Prisma.UserCreateInput) {
	let user = await prisma.user.create({ data })
	const accessToken = await signAccessToken(user)
	return { accessToken, user }
}

export async function login({
	username,
	password
}: Pick<User, 'username' | 'password'>) {
	const user = await prisma.user.findUnique({
		where: {
			username
		}
	})
	if (!user) {
		throw NotFound('Username or password not valid')
	}
	const checkPassword = compareSync(password, user.password)
	if (!checkPassword) throw Unauthorized('Username or password not valid')
	const accessToken = await signAccessToken(user)
	return { accessToken, user }
}

export async function all() {
	const allUsers = await prisma.user.findMany()
	return allUsers
}
