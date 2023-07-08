import { Delete } from '@mui/icons-material'
import { IconButton } from "@mui/material"
import dynamic from "next/dynamic"
import { useState } from "react"

import { Tooltip } from "@/app/client/components"

import type { UseFieldArrayRemove } from "react-hook-form"

const ConfirmDialog = dynamic(() =>
	import('@/app/components/ConfirmDialog'), {	ssr: false })

type Props = {
	index: number
	remove: UseFieldArrayRemove
	label: string
	okText: string
	cancelText: string
	busy: boolean
}

export default function Button({
	index,
	remove,
	label,
	okText,
	cancelText,
	busy,
}: Props) {
	const [confirmOpen, setConfirmOpen] = useState(false)
	return <>
		<Tooltip title={label}>
			<IconButton
				disabled={busy}
				onClick={() => setConfirmOpen(true)}>
				<Delete role='img' color='primary' />
			</IconButton>
		</Tooltip>
		{confirmOpen && <ConfirmDialog
			title={`${label}?`}
			open={confirmOpen}
			setOpen={setConfirmOpen}
			onConfirm={() => remove(index)}
			okText={okText}
			cancelText={cancelText}
		/>}
	</>
}
