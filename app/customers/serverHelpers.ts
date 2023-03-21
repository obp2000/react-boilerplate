import 'server-only'

import type { Translation } from '@/app/i18n/dictionaries'

export function labels({ not_found: notFound, customer: labels }: Translation) {
	return {
		notFound,
		labels,
	}
}

export async function getOptions() {
	return {}
}
