import { Params } from '@/interfaces/api'
import { getOptions } from '@/options/server'
import { getObject } from '@/objectForm/server'
import { getAuth } from '@/auth/server'
import { notFound } from 'next/navigation'
import Form from './ProductForm'
import { getInitialValues } from './helpers'
import Header from '@/objectForm/Header'
import { ProductOptionsType } from '@/interfaces/products'
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
	const { options } = optionsData as ProductOptionsType
	const initialValues = getInitialValues({ object, options })
	return <>
		<Header {...{ object, ...optionsData }} />
		<Form {...{ id, initialValues, ...optionsData, accessToken }} />
	</>
}
