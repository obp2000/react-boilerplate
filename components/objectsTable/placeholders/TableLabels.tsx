import Placeholder from '@/client/Placeholder'
// import Row from '@/client/Row'

function Th() {
	return <th scope="col"><Placeholder sm={6} /></th>
}

export default function TableLabels() {
	return <Placeholder as='tr' animation="wave">
		<th scope="col"><Placeholder sm={12} /></th>
		<th scope="col"><Placeholder sm={12} /></th>
		<Th />
		<Th />
		<Th />
		<Th />
	</Placeholder>
}
