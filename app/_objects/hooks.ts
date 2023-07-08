import { useRouter } from 'next/navigation'
// import type { Values as CustomerValues } from '@/interfaces/customers'
import type { Values as OrderValues } from '@/interfaces/orders'
// import type { Values as ProductValues } from '@/interfaces/products'
import { toastSuccess } from '@/app/components/toast'
import { useCallback } from 'react'

export function useMutate({	lng, table, id, message }: { 
	lng: string
	table: string
	id?: number
	message: string
}) {
	const { refresh, push } = useRouter()
	return useCallback(async (values: OrderValues) => {
		let url = `/api/${table}`
		if (id) {
			url += `/${id}`
		}
		const res = await fetch(url, {
			method: id ? 'PUT' : 'POST',
			body: JSON.stringify(values),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		})
		if (res.ok) {
			toastSuccess(message)
			refresh()
			push(`/${lng}/${table}`)
		}
	}, [table, id, message, refresh, push, lng])
}
