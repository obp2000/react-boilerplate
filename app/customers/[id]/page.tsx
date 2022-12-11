import { Params } from '@/interfaces/api'
import { getOptions } from '@/options/server'
import { getObject } from '@/objectForm/server'
import { getAuth } from '@/auth/server'
import { notFound } from 'next/navigation'
import Form from './CustomerForm'
import { getInitialValues } from './helpers'
import Header from '@/objectForm/Header'
import path from 'path'

export default async function Page({ params: { id } }: Params) {
	// console.log('object page dir ', path.basename(__dirname))
	const dirname = __dirname.replace('/[id]', '')
	const indexUrl = `/${path.basename(dirname)}/`
	let object
	if (id != 'new') {
		object = await getObject({ id })
		if (!object) { notFound() }
	}
	const { accessToken } = getAuth()
	const optionsData = await getOptions(indexUrl)
	const initialValues = getInitialValues({ object })
	return <>
		<Header {...{ object, ...optionsData }} />
		<Form {...{ id, initialValues, ...optionsData, accessToken }} />
	</>
}
