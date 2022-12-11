import { Params } from '@/interfaces/api'
import { getOptions } from '@/options/server'
import { getAuth } from '@/auth/server'
import { getObject } from '@/objectForm/server'
import { notFound } from 'next/navigation'
import Form from './OrderForm'
import { getInitialValues } from './helpers'
import Header from '@/objectForm/Header'
import { OrderOptionsType } from '@/interfaces/orders'
import path from 'path'

export default async function Page({ params: { id } }: Params) {
	const dirname = __dirname.replace('/[id]', '')
	const indexUrl = `/${path.basename(dirname)}/`
	let object
	if (id != 'new') {
		object = await getObject({ id })
		if (!object) { notFound() }
	}
	const { accessToken } = getAuth()
	const optionsData = await getOptions(indexUrl)
	const { options } = optionsData as OrderOptionsType
	const initialValues = getInitialValues({ object, options })
	return <>
		<Header {...{ object, ...optionsData }} />
		<Form {...{ id, initialValues, ...optionsData, accessToken }} />
	</>
}
