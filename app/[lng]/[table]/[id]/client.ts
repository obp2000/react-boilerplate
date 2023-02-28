'use client'

import type { Values as CustomerValues } from '@/app/customers/calculator'
import type { Values as OrderValues } from '@/app/orders/calculator'
import type { Values as ProductValues } from '@/app/products/calculator'
import { getAuth } from '@/app/auth/client'
import { errorMessage } from '@/app/error/client'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { objectToFormData } from 'object-to-formdata'
import { ParsedUrlQuery } from 'querystring'
import type { TransitionStartFunction } from 'react'
import { toastSuccess } from '@/app/notifications/toastSuccess'
import { toastError } from '@/app/notifications/toastError'

type Props = Pick<AppRouterInstance, 'refresh' | 'push'> & {
	isNewObject: boolean
	lng: string
	id: ParsedUrlQuery['id']
	values: CustomerValues | ProductValues | OrderValues
	indexUrl: string
	contentType?: string
	message: string,
	startTransition: TransitionStartFunction,
}

export async function mutateObject({
	isNewObject,
	lng,
	id,
	values,
	indexUrl,
	refresh,
	push,
	contentType = 'application/json',
	message,
	startTransition,
}: Props) {
	const isJSONContent = contentType === 'application/json'
	const headers = new Headers()
	const { accessToken } = getAuth()
	if (accessToken) {
		headers.append('authorization', `Token ${accessToken}`)
	}
	if (isJSONContent) {
		headers.append('Content-Type', contentType)
	}
	const mutatePath = isNewObject ? '' : id
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${indexUrl}${mutatePath}`, {
		method: isNewObject ? 'POST' : 'PUT',
		body: isJSONContent	? JSON.stringify(values) : objectToFormData(values),
		headers,
	})
	if (res.ok) {
		// const { toastSuccess } = await import('@/notifications/toastSuccess')
		startTransition(() => {
			push(`/${lng}${indexUrl}`)
			refresh()
			toastSuccess(message)
		})
	} else {
		// const { toastError } = await import('@/notifications/toastError')
		toastError(await errorMessage(res))
	}
}
