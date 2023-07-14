import Form from './_components/Form'
import { ObjectPage } from '@/app/_objects/ObjectPage'
import { prisma } from '@/services/prisma'
import tables from '@/app/_tables/tables.json'

import type { Translation } from '@/app/i18n/dictionaries'

function labels({
	product: labels
}: Translation) {
	return {
		labels,
	}
}

async function getOptions() {
	const productTypes = await prisma.productType.findMany({
		select: tables.products.select.objects.productType.select
	})
	return { productTypes }
}

export default async function Page({
	params
}: { params: { lng: string, id: string } }) {
	const table = 'products'
	return <ObjectPage {...{
		params,
		table,
		labels,
		getOptions,
		form: Form,
	}} />
}
