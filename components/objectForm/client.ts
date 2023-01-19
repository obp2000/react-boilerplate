'use client'

import type { Values as CustomerValues } from '@/app/[lng]/customers/[id]/calculator'
import type { Values as OrderValues } from '@/app/[lng]/orders/[id]/calculator'
import type { Values as ProductValues } from '@/app/[lng]/products/[id]/calculator'
import { getAuth } from '@/auth/client'
import { errorMessage } from '@/error/client'
import { baseUrl } from '@/services/config'
import { TFunction } from 'i18next'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { objectToFormData } from 'object-to-formdata'

type Props = { id: string } & Pick<AppRouterInstance, 'refresh' | 'push'> & {
	modValues: CustomerValues | ProductValues | OrderValues
	indexUrl: string
	contentType?: string
	t: TFunction
}

export const mutateObject = async ({
	id,
	modValues,
	indexUrl,
	refresh,
	push,
	contentType = 'application/json',
	t,
}: Props) => {
	const isJSONContent = contentType === 'application/json'
	const isNewObject = id === 'new'
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
		headers.append('Authorization', `Token ${accessToken}`)
	}
	if (isJSONContent) {
		headers.append('Content-Type', contentType)
	}
	options.headers = headers
	const mutatePath = isNewObject ? '' : `${id}`
	const res = await fetch(`${baseUrl}${indexUrl}${mutatePath}`, options)
	if (res.ok) {
		const { toastSuccess } = await import('@/notifications/toastSuccess')
		toastSuccess(String(t('successfully')))
		push(indexUrl)
		refresh()
	} else {
		const { toastError } = await import('@/notifications/toastError')
		toastError(await errorMessage(res, t))
	}
}
