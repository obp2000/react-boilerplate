import 'server-only'

import {
	getDictionary,
	type ModelNames, type Translation
} from '@/app/i18n/dictionaries'
import AddIcon from '@/app/useClient/AddIcon'
import Paper from '@/app/useClient/Paper'
import StyledTableCell from '@/app/useClient/StyledTableCell'
import Table from '@/app/useClient/Table'
import TableContainer from '@/app/useClient/TableContainer'
import TableHead from '@/app/useClient/TableHead'
import TableRow from '@/app/useClient/TableRow'
import Tooltip from '@/app/useClient/Tooltip'
import Typography from '@/app/useClient/Typography'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { isLoggedIn } from '@/services/getUser'
import { fallbackLng } from '@/app/i18n/settings'
import { ParsedUrlQuery } from 'querystring'

type TableLabels = (arg0: Translation) => string[]

function HeaderFields({
	tableLabels,
	dict
}: {
	tableLabels: TableLabels
	dict: Translation
}) {
	return <>
		{tableLabels(dict).map((tableLabel, index) => <StyledTableCell key={index}>
			{tableLabel}
		</StyledTableCell>)}
	</>
}

type GetHeaderRow = {
	loggedIn: boolean
	tableLabels: TableLabels
	dict: Translation
	lng: string
	table: string
}

function getHeaderRow({
	loggedIn,
	tableLabels,
	dict,
	lng,
	table,
}: GetHeaderRow) {
	if (loggedIn) {
		return function HeaderRow() {
			return <>
				<HeaderFields {...{ tableLabels, dict }} />
				<StyledTableCell>
					<Link
						aria-label={dict.new}
						href={`/${lng}/${table}/new`}
					// prefetch={false}
					>
						<Tooltip title={dict.new}>
							<AddIcon color='primary' />
						</Tooltip>
					</Link>
				</StyledTableCell>
			</>
		}
	} else {
		return function HeaderRow() {
			return <HeaderFields {...{ tableLabels, dict }} />
		}
	}
}

export async function TableLayout({
	params,
	tableLabels,
	table,
	children,
}: {
	params: ParsedUrlQuery
	tableLabels: TableLabels
	table: string
	children?: ReactNode
}) {
	const lng = String(params.lng || fallbackLng)
	const [dict, loggedIn] = await Promise.all([
		getDictionary(lng),
		isLoggedIn()
	])
	const HeaderRow = getHeaderRow({
		loggedIn,
		tableLabels,
		dict,
		lng,
		table,
	})
	return <TableContainer component={Paper}>
		<Typography
			component="h1"
			variant="h5"
			color="inherit"
			align="center"
			noWrap
			sx={{ flex: 1 }}
		>
			{dict[table as keyof ModelNames].plural}
		</Typography>
		<Table sx={{ minWidth: 650 }} size="small">
			<TableHead>
				<TableRow>
					<HeaderRow />
				</TableRow>
			</TableHead>
			{children}
		</Table>
	</TableContainer>
}
