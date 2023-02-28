'use client'

export async function errorMessage(res: Response): Promise<string> {
	// res.text()
	const json = await res.json()
	return json?.non_field_errors && json.non_field_errors[0] ||
		json?.detail || res.statusText
}
