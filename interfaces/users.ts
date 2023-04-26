import { Prisma } from '@prisma/client'

export type UserObject = Prisma.UserGetPayload<{ select: Prisma.UserSelect }>

export type Values = Prisma.UserCreateArgs['data']

export type LoginValues = Pick<Values, 'name' | 'password'>

export type RegisterValues = Pick<Values,
	'name' | 'email' | 'firstName' | 'lastName'> &
{ password1: string, password2: string }
