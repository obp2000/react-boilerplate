'use client'

import { AnyObjectType } from '@/interfaces/api'
import { AccessToken } from '@/interfaces/auth'
import { CommonConstsType } from '@/interfaces/commonConsts'
import { IndexUrl } from '@/interfaces/index'
import { toastError, toastSuccess } from '@/notifications/toast'
import { errorMessage } from '@/services/api/client'
import { baseUrl } from '@/services/config'

type Props = Required<AnyObjectType> & IndexUrl & CommonConstsType &
	Required<AccessToken> & {
		refresh: () => void
	}

export const deleteObject = async ({
	object,
	indexUrl,
	accessToken,
	commonConsts,
	refresh
}: Props) => {
	let options: RequestInit = {
		method: 'DELETE',
	}
	if (accessToken) {
		const headers = new Headers()
		headers.append('Authorization', `Token ${accessToken}`)
		options.headers = headers
	}
	const res = await fetch(`${baseUrl}${indexUrl}${object.id}`, options)
	if (res.ok) {
		toastSuccess(commonConsts?.successfully)
		refresh()
	} else {
		toastError(await errorMessage(res))
	}
}
