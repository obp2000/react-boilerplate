import 'server-only'

import prisma from "@/services/prisma"
import select from './select.json'
import { Product } from './helpers'
import { densityForCount, metersInRoll, prices, Values } from './calculator'
import { Translation } from '@/app/i18n/dictionaries'
import { getProductTypes } from '@/app/[lng]/products/productTypes/serverHelpers'

export async function getObject(id: number) {
	return await prisma.product.findUniqueOrThrow({
		where: {
			id,
		},
		select,
	})
}

export function getInitialValues({ object }: { object?: Product }): Values {
  let { created_at, ...rest } = object ?? {}
  let objectValues = rest as Values
  return {
    ...objectValues,
    density_for_count: densityForCount(null, objectValues),
    meters_in_roll: metersInRoll(null, objectValues),
    prices: prices(null, objectValues),
  }
}

export function labels({ product: labels }: Translation) {
	return {
		labels,
	}
}

export async function options() {
	const productTypes = await getProductTypes()
	return { productTypes }
}
