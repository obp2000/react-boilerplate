import 'server-only'

import prisma from "@/services/prisma"
import select from './select.json'

export async function getProductTypes() {
	return await prisma.productType.findMany({
		select
	})
}
