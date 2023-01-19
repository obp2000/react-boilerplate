'use client'

import { getAuth } from '@/auth/client'
import { errorMessage } from '@/error/client'
import { baseUrl } from '@/services/config'
import { TFunction } from 'i18next'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

type Props = Pick<AppRouterInstance, 'refresh'> & {
	id: number
	indexUrl: string
	message: string
	t: TFunction
}

export const deleteObject = async ({
	id,
	indexUrl,
	message,
	refresh,
	t
}: Props) => {
	let options: RequestInit = {
		method: 'DELETE',
	}
	const { accessToken } = getAuth()
	if (accessToken) {
		const headers = new Headers()
		headers.append('Authorization', `Token ${accessToken}`)
		options.headers = headers
	}
	const res = await fetch(`${baseUrl}${indexUrl}${id}`, options)
	if (res.ok) {
		const { toastSuccess } = await import('@/notifications/toastSuccess')
		toastSuccess(message)
		refresh()
	} else {
		const { toastError } = await import('@/notifications/toastError')
		toastError(await errorMessage(res, t))
	}
}
