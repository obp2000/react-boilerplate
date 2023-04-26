import BackButton from '@/app/components/BackButton'
import { getDictionary, type ModelNames } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import Paper from '@/app/useClient/Paper'
import Stack from '@/app/useClient/Stack'
import Typography from '@/app/useClient/Typography'
import getUser from '@/services/getUser'
import { notFound } from 'next/navigation'
import type { ParsedUrlQuery } from 'querystring'
import type { ReactNode } from 'react'

export async function ObjectLayout({
	params,
	table,
	children,
}: {
	params: ParsedUrlQuery
	table: string
	children?: ReactNode
}) {
	const user = await getUser()
	if (!user) {
		notFound()
	}
	const lng = String(params.lng || fallbackLng)
	const id = String(params.id)
	const dict = await getDictionary(lng)
	const modelName = dict[table as keyof ModelNames].singular
	const title = id === 'new'
		? `${dict.new} ${modelName.toLowerCase()}`
		: `${modelName} № ${id}`
	return <Paper elevation={3}>
		<Stack direction="row" spacing={2}>
			<BackButton label={dict.back} />
			<Typography
				component="h1"
				variant="h6"
				color="inherit"
				align="center"
				noWrap
				aria-label={title}
				sx={{ flex: 1 }}
			>
				{title}
			</Typography>
		</Stack>
		{children}
	</Paper>
}
