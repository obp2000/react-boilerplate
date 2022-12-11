'use client'

import type { CustomerSubmitValues } from '@/interfaces/customers'
import type { OrderSubmitValues } from '@/interfaces/orders'
import type { ProductSubmitValues } from '@/interfaces/products'
import { toastError, toastSuccess } from '@/notifications/toast'
import { baseUrl } from '@/services/config'
import { objectToFormData } from 'object-to-formdata'
import { errorMessage } from '@/services/api/client'
import { AccessToken } from '@/interfaces/auth'
import { CommonConstsType } from '@/interfaces/commonConsts'
import { IdParam } from '@/interfaces/api'

type Props = IdParam & Required<AccessToken> & CommonConstsType & {
	modValues: CustomerSubmitValues | ProductSubmitValues | OrderSubmitValues
	indexUrl: string
	refresh: () => void
	push: (arg0: string) => void
	contentType?: string
}

export const mutateObject = async ({
	id,
	modValues,
	indexUrl,
	accessToken,
	commonConsts,
	refresh,
	push,
	contentType = 'application/json'
}: Props) => {
	const isJSONContent = contentType === 'application/json'
	const isNewObject = id === 'new'
	let options: RequestInit = {
		method: isNewObject ? 'POST' : 'PUT',
		body: isJSONContent
			? JSON.stringify(modValues)
			: objectToFormData(modValues),
	}
	const headers = new Headers()
	if (accessToken) {
		headers.append('Authorization', `Token ${accessToken}`)
	}
	if (isJSONContent) {
		headers.append('Content-Type', contentType)
	}
	options.headers = headers
	const mutatePath = isNewObject ? '' : `${id}/`
	const res = await fetch(`${baseUrl}${indexUrl}${mutatePath}`, options)
	if (res.ok) {
		toastSuccess(commonConsts?.successfully)
		push(indexUrl)
		refresh()
	} else {
		toastError(await errorMessage(res))
	}
}
