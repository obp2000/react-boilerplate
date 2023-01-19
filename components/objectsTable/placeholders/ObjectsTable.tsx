// import TableBody from '@/client/TableBody'
// import TableRow from '@/client/TableRow'
// import TableCell from '@/client/TableCell'

// export default function ObjectsTable() {
// 	return <>
// 		<Header />
// 		<Placeholder as={Table} animation="glow" striped bordered hover size='sm'
// 			variant='secondary'>
// 			<thead className="thead-light">
// 				<LabelsRow />
// 			</thead>
// 			<tbody>
// 				<TableRow />
// 				<TableRow />
// 				<TableRow />
// 				<TableRow />
// 				<TableRow />
// 				<TableRow />
// 				<TableRow />
// 				<TableRow />
// 			</tbody>
// 		</Placeholder>
// 	</>
// }

export default function ObjectsTable() {
	return <>
	<div className="space-y-2.5 bg-white shadow-md rounded my-6 pb-2 w-full animate-pulse">
		<div className="flex items-center space-x-2 w-full">
			<div className="h-7 bg-gray-200 rounded-full dark:bg-gray-600 w-36"></div>
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-700 w-48"></div>
		</div>
	</div>
	<div className="space-y-2.5 bg-white shadow-md rounded my-6 pb-2 animate-pulse">
		<div className="flex items-center space-x-2 w-full">
			<div className="h-7 bg-gray-200 rounded-full dark:bg-gray-600 w-32"></div>
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-600 w-96"></div>
		</div>
		<div className="flex items-center space-x-2 w-full">
			<div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
		</div>
		<div className="flex items-center space-x-2 w-full">
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
			<div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-600 w-96"></div>
		</div>
		<div className="flex items-center space-x-2 w-full">
			<div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-600 w-96"></div>
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
		</div>
		<div className="flex items-center space-x-2 w-full">
			<div className="h-7 bg-gray-200 rounded-full dark:bg-gray-600 w-32"></div>
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-700 w-96"></div>
		</div>
		<div className="flex items-center space-x-2 w-full">
			<div className="h-7 bg-gray-200 rounded-full dark:bg-gray-600 w-24"></div>
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-700 w-32"></div>
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-600 w-96"></div>
		</div>
		<div className="flex items-center space-x-2 w-full">
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
			<div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-600 w-96"></div>
		</div>
		<div className="flex items-center space-x-2 w-full">
			<div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
			<div className="h-7 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
		</div>
		<span className="sr-only">Loading...</span>
	</div>
	</>
}

	// <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
