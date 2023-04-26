import { useParams, useRouter } from 'next/navigation'
import type { Values as CustomerValues } from '@/interfaces/customers'
import type { Values as OrderValues } from '@/interfaces/orders'
import type { Values as ProductValues } from '@/interfaces/products'
import { toastSuccess, toastError } from '@/app/components/toast'

export function useMutate({	id }: { id?: number }) {
	const { refresh, push } = useRouter()
	const params = useParams()
	return async (values: CustomerValues | ProductValues | OrderValues) => {
		let url = `${process.env.NEXT_PUBLIC_BASE_URL}/${params?.lng}/${params?.table}`
		if (id) {
			url += `/${id}`
		}
		console.log('url ', url)
		const res = await fetch(url, {
			method: id ? 'PUT' : 'POST',
			body: JSON.stringify(values),
			headers: new Headers({'Content-Type': 'application/json'}),
		})
		const { message } = await res.json()
		if (res.ok) {
			toastSuccess(message)
			push(`/${params?.lng}/${params?.table}`)
			refresh()
		} else {
			toastError(message)
		}
	}
}
