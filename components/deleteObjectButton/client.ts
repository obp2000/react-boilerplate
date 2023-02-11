'use client'

import { getAuth } from '@/auth/client'
import { errorMessage } from '@/error/client'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { TransitionStartFunction } from 'react'

type Props = Pick<AppRouterInstance, 'refresh'> & {
	id: number
	table: string
	message: string
	startTransition: TransitionStartFunction,
}

export const deleteObject = async ({
	id,
	table,
	message,
	refresh,
	startTransition,
}: Props) => {
	let options: RequestInit = {
		method: 'DELETE',
	}
	const { accessToken } = getAuth()
	if (accessToken) {
		const headers = new Headers()
		headers.append('authorization', `Token ${accessToken}`)
		options.headers = headers
	}
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${table}/${id}`, options)
	if (res.ok) {
		const { toastSuccess } = await import('@/notifications/toastSuccess')
		toastSuccess(message)
	    startTransition(refresh)
	} else {
		const { toastError } = await import('@/notifications/toastError')
		toastError(await errorMessage(res))
	}
}
