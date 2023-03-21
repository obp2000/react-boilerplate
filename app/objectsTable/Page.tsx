import DeleteObjectButton from '@/app/deleteObjectButton/Button'
import type { Translation } from '@/app/i18n/dictionaries'
import Pagination from '@/app/pagination/Pagination'
import AddIcon from '@/app/useClient/AddIcon'
import EditIcon from '@/app/useClient/EditIcon'
import Paper from '@/app/useClient/Paper'
import Stack from '@/app/useClient/Stack'
import Table from '@/app/useClient/Table'
import TableBody from '@/app/useClient/TableBody'
import TableCell from '@/app/useClient/TableCell'
import TableContainer from '@/app/useClient/TableContainer'
import TableHead from '@/app/useClient/TableHead'
import TableRow from '@/app/useClient/TableRow'
import Tooltip from '@/app/useClient/Tooltip'
import Typography from '@/app/useClient/Typography'
import type { Customer } from '@/interfaces/customers'
import type { Order } from '@/interfaces/orders'
import type { Product } from '@/interfaces/products'
import { makeSerializable } from '@/services/util'
import Link from 'next/link'

type CustomersProps = {
	lng: string
	table: string
	dict: Translation
	TableLabels: (arg0: { dict: Translation }) => JSX.Element
	Row: (arg0: Customer) => JSX.Element
	data: Customer[]
	total: number
	totalPages: number
	isAuthenticated?: boolean
	accessToken?: string
	modelNameSingular: string
	modelNamePlural: string
	deletePath: string
}

type ProductsProps = {
	lng: string
	table: string
	dict: Translation
	TableLabels: (arg0: { dict: Translation }) => JSX.Element
	Row: (arg0: Product) => JSX.Element
	data: Product[]
	total: number
	totalPages: number
	isAuthenticated?: boolean
	accessToken?: string
	modelNameSingular: string
	modelNamePlural: string
	deletePath: string
}

type OrdersProps = {
	lng: string
	table: string
	dict: Translation
	TableLabels: (arg0: { dict: Translation }) => JSX.Element
	Row: (arg0: Order) => JSX.Element
	data: Order[]
	total: number
	totalPages: number
	isAuthenticated?: boolean
	accessToken?: string
	modelNameSingular: string
	modelNamePlural: string
	deletePath: string
}

export default function Page(props: CustomersProps): JSX.Element
export default function Page(props: ProductsProps): JSX.Element
export default function Page(props: OrdersProps): JSX.Element
export default function Page({
	lng,
	table,
	dict,
	TableLabels,
	Row,
	data,
	total,
	totalPages,
	isAuthenticated,
	accessToken,
	modelNameSingular,
	modelNamePlural,
	deletePath,
}: any) {
	return <Paper elevation={3}>
		<Stack direction="row" spacing={2}>
			<Typography
				component="h1"
				variant="h6"
				color="inherit"
				align="center"
				noWrap
				sx={{ flex: 1 }}
			>
				{modelNamePlural} ({total})
			</Typography>
			<Pagination totalPages={totalPages} />
		</Stack>
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size="small">
				<TableHead>
					<TableRow>
						<TableLabels {...{ dict }} />
						{isAuthenticated && <TableCell>
							<Link
								aria-label={dict.new}
								href={`/${lng}/${table}/new`}
							// prefetch={false}
							>
								<Tooltip title={dict.new}>
									<AddIcon />
								</Tooltip>
							</Link>
						</TableCell>}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((object: Customer | Product | Order, key: number) => <TableRow key={key}
						aria-label={modelNameSingular}>
						<Row {...makeSerializable(object)} />
						{isAuthenticated && <TableCell>
							<Link
								aria-label={dict.edit}
								href={`/${lng}/${table}/${object.id}`}
							// prefetch={false}
							>
								<Tooltip title={dict.edit}>
									<EditIcon />
								</Tooltip>
							</Link>
							<DeleteObjectButton {...{
								deletePath,
								id: object.id as number,
								label: dict.delete,
								message: dict.successfully,
								okText: dict.yes,
								cancelText: dict.no,
								accessToken: String(accessToken),
							}} />
						</TableCell>}
					</TableRow>)}
				</TableBody>
			</Table>
		</TableContainer>
	</Paper>
}
