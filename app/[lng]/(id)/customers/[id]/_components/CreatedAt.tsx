import { formatRu } from "@/app/components/Date"
import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedCustomerObject } from "@/interfaces/customers"
import { TextField } from '@mui/material'

export default function CreatedAt({
	initialValues,
	labels: {
		createdAt,
	},
}: {
	initialValues: SerializedCustomerObject
	labels: Translation['customer']
}) {
	if (!initialValues.createdAt) { return null }
	return <TextField
		id='createdAt'
		label={createdAt}
		size="small"
		disabled
		value={formatRu(initialValues.createdAt)}
	/>
}
