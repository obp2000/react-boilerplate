import type { NextApiRequest } from 'next'
import { assert } from 'superstruct'
import { Register } from '@/app/auth/register'
import { Login } from '@/app/auth/login'

export function validateRegister({
	body: {
		first_name = '',
		last_name = '',
		password,
		...rest
	} }: NextApiRequest) {
	const data = { ...rest, first_name, last_name }
	assert(data, Register)
	return data
}

export function validateLogin({ body }: NextApiRequest) {
	assert(body, Login)
	return body
}
