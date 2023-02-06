'use client'

import type { Values as CustomerValues } from '@/app/[lng]/customers/[id]/calculator'
import type { Values as OrderValues } from '@/app/[lng]/orders/[id]/calculator'
import type { Values as ProductValues } from '@/app/[lng]/products/[id]/calculator'
import { getAuth } from '@/auth/client'
import { errorMessage } from '@/error/client'
import { baseUrl } from '@/services/config'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { objectToFormData } from 'object-to-formdata'
import { ParsedUrlQuery } from 'querystring'
import type { TransitionStartFunction } from 'react'
import { toastSuccess } from '@/notifications/toastSuccess'
import { toastError } from '@/notifications/toastError'

type Props = Pick<AppRouterInstance, 'refresh' | 'push'> & {
	isNewObject: boolean
	lng: string
	id: ParsedUrlQuery['id']
	modValues: CustomerValues | ProductValues | OrderValues
	indexUrl: string
	contentType?: string
	message: string,
	startTransition: TransitionStartFunction,
}

export async function mutateObject({
	isNewObject,
	lng,
	id,
	modValues,
	indexUrl,
	refresh,
	push,
	contentType = 'application/json',
	message,
	startTransition,
}: Props) {
	const isJSONContent = contentType === 'application/json'
	let options: RequestInit = {
		method: isNewObject ? 'POST' : 'PUT',
		body: isJSONContent
			? JSON.stringify(modValues)
			: objectToFormData(modValues),
		// body: JSON.stringify(modValues),
	}
	const headers = new Headers()
	const { accessToken } = getAuth()
	if (accessToken) {
		headers.append('authorization', `Token ${accessToken}`)
	}
	if (isJSONContent) {
		headers.append('Content-Type', contentType)
	}
	options.headers = headers
	const mutatePath = isNewObject ? '' : id
	const res = await fetch(`${baseUrl}${indexUrl}${mutatePath}`, options)
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
