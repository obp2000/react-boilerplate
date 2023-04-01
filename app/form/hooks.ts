import { useRouter } from 'next/navigation'
import type { Values as CustomerValues } from '@/interfaces/customers'
import type { Values as OrderValues } from '@/interfaces/orders'
import type { Values as ProductValues } from '@/interfaces/products'
import { objectToFormData } from 'object-to-formdata'
import type { TransitionStartFunction } from 'react'
import { toastSuccess, toastError } from '@/app/notifications/toast'

type Props = {
	mutateUrl: string
	mutateMethod: string
	redirectUrl: string
	accessToken: string
	toFormData?: boolean
	startTransition: TransitionStartFunction
	message: string
}

export function useOnSubmit({
	mutateUrl,
  	mutateMethod,
	redirectUrl,
	accessToken,
	toFormData,
	startTransition,
	message
}: Props) {
	const { refresh, push } = useRouter()
	return async (values: CustomerValues | ProductValues | OrderValues) => {
		const headers = new Headers({ authorization: `Token ${accessToken}`})
		if (!toFormData) {
			headers.append('Content-Type', 'application/json')
		}
		const res = await fetch(mutateUrl, {
			method: mutateMethod,
			body: toFormData ? objectToFormData(values) : JSON.stringify(values),
			headers,
		})
		if (res.ok) {
			startTransition(() => {
				push(redirectUrl)
				refresh()
				toastSuccess(message)
			})
		} else {
		    const { message } = await res.json()
		    toastError(message)
			// toastError(await errorMessage(res))
		}
	}
}
