import 'server-only'

import type { Translation } from "@/app/i18n/dictionaries"
import type { Customer } from '@/interfaces/customers'

export function getGetCustomerShortName(labels: Translation['customer']) {
	return (customer: Partial<Customer>) => {
		if (!customer) { return '' }
		const label = []
		label.push(customer.nick)
		if (customer.name) {
			label.push(`${labels.name}: ${customer.name}`)
		}
		return label.join(' ')
	}
}
