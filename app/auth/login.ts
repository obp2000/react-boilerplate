import {
	object,
	string,
	nonempty,
} from 'superstruct'

export const Login = object({
	username: nonempty(string()),
	password: nonempty(string()),
})
