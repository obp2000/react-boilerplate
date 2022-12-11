import Col from '@/client/Col'
import Placeholder from '@/client/Placeholder'
import PlaceholderButton from '@/client/PlaceholderButton'
import Row from '@/client/Row'

export default function Header() {
	return <Placeholder as={Row} animation="wave">
		<Col sm={2}>
			<PlaceholderButton sm={4} variant='outline-primary'
				className='mb-3 me-2' />
		</Col>
		<Col sm={6}>
			<h4>
				<Placeholder sm={11} size='lg' />
			</h4>
		</Col>
	</Placeholder>
}
