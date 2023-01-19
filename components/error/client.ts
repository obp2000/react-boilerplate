'use client'

import { TFunction } from "i18next"

export async function errorMessage(res: Response, t: TFunction) {
	// res.text()
	const json = await res.json()
	return t(json?.non_field_errors && json.non_field_errors[0]) ||
		json?.detail || res.statusText
}
