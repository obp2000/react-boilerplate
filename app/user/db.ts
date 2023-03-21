import prisma from '@/services/prisma'
import { UserObject, Values } from '@/interfaces/users'

export async function findUnique({ username }: Pick<UserObject, 'username'>) {
	return await prisma.user.findUnique({
		where: {
			username
		}
	})
}

export async function create({ data }: { data: Values }) {
	return await prisma.user.create({ data })
}

export async function all() {
	return await prisma.user.findMany()
}
