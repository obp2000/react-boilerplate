import { all as allUsers, create, findUnique } from "@/app/user/db"
import type { Values } from '@/interfaces/users'
import { compareSync } from 'bcryptjs'
import { NotFound, Unauthorized } from 'http-errors'
import { signAccessToken } from './jwt'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

export async function register(data: Values) {
	let user = await create({ data })
	const accessToken = await signAccessToken(user, String(accessTokenSecret))
	return { accessToken, user }
}

export async function login({
	username,
	password
}: Pick<Values, 'username' | 'password'>) {
	const user = await findUnique({ username })
	if (!user) {
		throw NotFound('usernameOrPasswordNotValid')
	}
	const checkPassword = compareSync(password, user.password)
	if (!checkPassword) throw Unauthorized('usernameOrPasswordNotValid')
	const accessToken = await signAccessToken(user, String(accessTokenSecret))
	return { accessToken, user }
}

export async function all() {
	return await allUsers()
}
