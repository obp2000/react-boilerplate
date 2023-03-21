import { useRouter } from 'next/navigation'
import type { Values as CustomerValues } from '@/interfaces/customers'
import type { Values as OrderValues } from '@/interfaces/orders'
import type { Values as ProductValues } from '@/interfaces/products'
import { errorMessage } from '@/app/error/client'
import { objectToFormData } from 'object-to-formdata'
import { ParsedUrlQuery } from 'querystring'
import type { Dispatch, SetStateAction, TransitionStartFunction } from 'react'

type Props = {
	params: ParsedUrlQuery
	table: string
	accessToken: string
	contentType?: string
	startTransition: TransitionStartFunction
	setSuccess: Dispatch<SetStateAction<boolean>>
	setErrorMessage: Dispatch<SetStateAction<string | null>>
}

export function useOnSubmit({
	params: { lng, id },
	table,
	accessToken,
	contentType = 'application/json',
	startTransition,
	setSuccess,
	setErrorMessage,
}: Props) {
	const { refresh, push } = useRouter()
	return async (values: CustomerValues | ProductValues | OrderValues) => {
		const isJSONContent = contentType === 'application/json'
		const headers = new Headers()
		if (accessToken) {
			headers.append('authorization', `Token ${accessToken}`)
		}
		if (isJSONContent) {
			headers.append('Content-Type', contentType)
		}
		const mutatePath = id === 'new' ? '' : `/${id}`
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${table}${mutatePath}`, {
			method: id === 'new' ? 'POST' : 'PUT',
			body: isJSONContent ? JSON.stringify(values) : objectToFormData(values),
			headers,
		})
		if (res.ok) {
			// const { toastSuccess } = await import('@/notifications/toastSuccess')
			setSuccess(true)
			startTransition(() => {
				push(`/${lng}/${table}`)
				refresh()
			})
		} else {
			// const { toastError } = await import('@/notifications/toastError')
			setErrorMessage(await errorMessage(res))
		}
	}
}
