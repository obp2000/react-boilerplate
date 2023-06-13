import { useRouter } from 'next/navigation'
import type { Values as CustomerValues } from '@/interfaces/customers'
import type { Values as OrderValues } from '@/interfaces/orders'
import type { Values as ProductValues } from '@/interfaces/products'
import { toastSuccess, toastError } from '@/app/components/toast'
import { useCallback } from 'react'

export function useMutate({	tablePath, id }: { 
	tablePath: string
	id?: number
}) {
	const { refresh, push } = useRouter()
	return useCallback(async (values: CustomerValues | ProductValues | OrderValues) => {
		let url = `/api${tablePath}`
		if (id) {
			url += `/${id}`
		}
		const res = await fetch(url, {
			method: id ? 'PUT' : 'POST',
			body: JSON.stringify(values),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		})
		const { message } = await res.json()
		if (res.ok) {
			toastSuccess(message)
			refresh()
			push(tablePath)
		} else {
			toastError(message)
		}
	}, [id, push, refresh, tablePath])
}
