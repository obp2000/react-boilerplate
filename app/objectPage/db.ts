import prisma from '@/services/prisma'
import { Prisma } from '@prisma/client'

export function getPrismaClient(model: string): Prisma.CustomerDelegate<Prisma.RejectOnNotFound>
export function getPrismaClient(model: string): Prisma.ProductDelegate<Prisma.RejectOnNotFound>
export function getPrismaClient(model: string): Prisma.OrderDelegate<Prisma.RejectOnNotFound>
export function getPrismaClient(model: string): any {
	return prisma[model as keyof typeof prisma]
}


// export async function getObject(
// 	id: number,
// 	model: string,
// 	select: typeof tables.customers.select.object
// ): Promise<Customer>
// export async function getObject(
// 	id: number,
// 	model: string,
// 	select: typeof tables.products.select.object
// ): Promise<Product>
// export async function getObject(
// 	id: number,
// 	model: string,
// 	select: any
// ): Promise<any> {
// 	let client
// 	if (model === 'customer') {
// 			client = prisma[model as keyof typeof prisma] as Prisma.CustomerDelegate<Prisma.RejectOnNotFound>
// 	}


// 	return await (prisma[model as keyof typeof prisma] as
// 			(Prisma.CustomerDelegate<Prisma.RejectOnNotFound> | Prisma.ProductDelegate<Prisma.RejectOnNotFound>).findUniqueOrThrow({
// 			where: {
// 				id,
// 			},
// 			select,
// 		})
// }
