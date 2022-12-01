import Form from './ProductForm'
import { Params } from '@/interfaces/api'

export default function Page({ params: { id } }: Params) {
	return <Form {...{ id }} />
}
