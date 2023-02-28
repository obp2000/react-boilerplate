'use client'

import { errorMessage } from '@/app/error/client'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { TransitionStartFunction } from 'react'

type Props = Pick<AppRouterInstance, 'refresh'> & {
	id: number
	table: string
	message: string
	startTransition: TransitionStartFunction,
	accessToken: string
}

export const deleteObject = async ({
	id,
	table,
	message,
	refresh,
	startTransition,
	accessToken,
}: Props) => {
	const headers = new Headers()
	headers.append('authorization', `Token ${accessToken}`)
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${table}/${id}`, {
		method: 'DELETE',
		headers,
	})
	if (res.ok) {
		const { toastSuccess } = await import('@/app/notifications/toastSuccess')
		toastSuccess(message)
	    startTransition(refresh)
	} else {
		const { toastError } = await import('@/app/notifications/toastError')
		toastError(await errorMessage(res))
	}
}
