import Skeleton from '@/app/useClient/Skeleton'
import Paper from '@/app/useClient/Paper'
import Stack from '@/app/useClient/Stack'
import Table from '@/app/useClient/Table'
import TableBody from '@/app/useClient/TableBody'
import TableCell from '@/app/useClient/TableCell'
import TableContainer from '@/app/useClient/TableContainer'
import TableHead from '@/app/useClient/TableHead'
import TableRow from '@/app/useClient/TableRow'
import Typography from '@/app/useClient/Typography'

function Cell() {
	return <TableCell><Skeleton sx={{ fontSize: '1rem' }} /></TableCell>
}

function Row() {
	return <TableRow>
		<Cell />
		<Cell />
		<Cell />
		<Cell />
		<Cell />
		<Cell />
		<Cell />
	</TableRow>
}

export default function ObjectsTable() {
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
				<Skeleton sx={{ fontSize: '1rem' }} />
			</Typography>
			<Skeleton sx={{ fontSize: '1rem' }} />
		</Stack>
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size="small">
				<TableHead>
					<Row />
				</TableHead>
				<TableBody>
					<Row />
					<Row />
					<Row />
					<Row />
					<Row />
					<Row />
					<Row />
					<Row />
				</TableBody>
			</Table>
		</TableContainer>
	</Paper>
}
