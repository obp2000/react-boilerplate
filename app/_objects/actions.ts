'use server'

import 'server-only'

import { cache } from 'react'

import { getPrismaClient } from './ObjectPage'
import { Prisma } from '@prisma/client'

import type { ServerActionResult } from '@/interfaces/form'

const allFindManyArgs = {
	cities: () => import('@/app/[lng]/customers/_components/cities/helpers').then(
		({ findManyArgs }) => findManyArgs),
	customers: () => import('@/app/[lng]/customers/_components/helpers').then(
		({ findManyArgs }) => findManyArgs),
	products: () => import('@/app/[lng]/products/_components/helpers').then(
		({ findManyArgs }) => findManyArgs),
}

async function getFindManyArgsFunc(table: string):
	Promise<(term?: string | null) => Prisma.CustomerFindManyArgs>
async function getFindManyArgsFunc(table: string):
	Promise<(term?: string | null) => Prisma.CityFindManyArgs>
async function getFindManyArgsFunc(table: string):
	Promise<(term?: string | null) => Prisma.ProductFindManyArgs>
async function getFindManyArgsFunc(table: string):
	Promise<(term?: string | null) => any> {
	return allFindManyArgs[table as keyof typeof allFindManyArgs]()
}

export const getFindManyArgs = cache(getFindManyArgsFunc)

export async function search({
	term,
	table,
}: {
	term: string
	table: string
}): Promise<ServerActionResult> {
	const findManyArgs = await getFindManyArgs(table)
	const objects =
		await getPrismaClient(table).findMany(findManyArgs(term))
	// revalidatePath('/')
	// revalidatePath(`/[lng]/(id)/${table}/[id]`)
	return { success: true, objects }
}


// export type Translation = typeof enTranslation | typeof ruTranslation
// export type AllFindManyArgs = Record<string,
// 	() => Promise<Prisma.CityFindManyArgs |
// 	Prisma.CustomerFindManyArgs | Prisma.CustomerFindManyArgs>>

// type AnyFindManyArgs = Promise<(term: string) => Prisma.CityFindManyArgs> |
// 	Promise<(term: string) => Prisma.CustomerFindManyArgs> |
// 	Promise<(term: string) => Prisma.CustomerFindManyArgs>	

// function getWhere(fields: string[]) {
// 	return function where(term?: string | null) {
// 		if (!term) { return {} }
// 		return {
// 			OR: fields.map((field) => ({ [field]: { contains: term } }))
// 		}
// 	}
// }


// function where(term?: string | null) {
// 	if (!term) { return {} }
// 	const containsTerm = { contains: term }
// 	return {
// 		OR: [
// 			{ city: containsTerm },
// 			{ pindex: containsTerm },
// 		]
// 	}
// }

// type AnySelect = typeof tables.customers.select.objects.city.select |
// 	typeof tables.customers.select.objects |
// 	typeof tables.products.select.objects

// export function getFindManyArgs(
// 	fields: (string | Record<string, string>)[],
// 	select: AnySelect
// ) {
// 	const where = (term?: string | null) => {
// 		if (!term) { return {} }
// 		return {
// 			OR: fields.map((field) => {
// 				if (typeof field === 'string') {
// 					return { [field]: { contains: term } }
// 				}
// 				if (typeof field === 'object') {
// 					return Object.keys(field).map((key) => {
// 						return { [key]: { [field[key]]: { contains: term } } }
// 					})
// 				}
// 			})
// 		}
// 	}
// 	return (term?: string | null) => {
// 		return {
// 			where: where(term),
// 			select,
// 			orderBy: [
// 				{
// 					updatedAt: 'desc' as Prisma.SortOrder,
// 				},
// 			],
// 		} 
// 	}
// }

// function findManyArgs(term?: string | null) {
// 	return {
// 		where: where(term),
// 		select: tables.customers.select.objects.city.select,
// 	}
// }
