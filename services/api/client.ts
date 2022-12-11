'use client'

export const errorMessage = async (res: Response): Promise<string> => {
	const json = await res.json()
	return (json?.non_field_errors && json.non_field_errors[0]) ||
		json?.detail || res.statusText
}
