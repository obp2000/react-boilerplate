import Placeholder from '@/client/Placeholder'
import Table from '@/client/Table'
import Header from './Header'
import TableRow from './TableRow'
import TableLabels from './TableLabels'

export default function ObjectsTable() {
	return <>
		<Header />
		<Placeholder as={Table} animation="glow" striped bordered hover size='sm'
			variant='secondary'>
			<thead className="thead-light">
				<TableLabels />
			</thead>
			<tbody>
				<TableRow />
				<TableRow />
				<TableRow />
				<TableRow />
				<TableRow />
				<TableRow />
				<TableRow />
				<TableRow />
			</tbody>
		</Placeholder>
	</>
}
