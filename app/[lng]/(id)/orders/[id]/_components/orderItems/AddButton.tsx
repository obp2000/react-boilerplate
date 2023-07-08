import tables from '@/app/_tables/tables.json'
import type { SerializedOrderObject } from "@/interfaces/orders"
import { AddCircleOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { UseFieldArrayAppend } from "react-hook-form"
import { Tooltip } from "@/app/client/components"

export default function AddButton({
	add,
	append,
	busy,
}: {
	add: string
	append: UseFieldArrayAppend<SerializedOrderObject, 'orderItems'>
	busy: boolean
}) {
	return <Tooltip title={add}>
		<IconButton color='inherit' disabled={busy} onClick={() =>
			append(tables.orders.initOrderItem as unknown as
				SerializedOrderObject['orderItems'][number])
		}>
			<AddCircleOutlined />
		</IconButton>
	</Tooltip>
}
