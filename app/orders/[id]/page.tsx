import Form from './OrderForm'
import { Params } from '@/interfaces/api'

export default function Page({ params: { id } }: Params) {
	return <Form {...{ id }} />
}
