import { object, string, nonempty, any, define } from 'superstruct'

export const struct = object({
	name: nonempty(string()),
	password: nonempty(string()),
	redirect: any(),
	csrfToken: any(),
	callbackUrl: any(),
	json: any(),
})

export const Verified = define('Verified', (value) => !!value)
