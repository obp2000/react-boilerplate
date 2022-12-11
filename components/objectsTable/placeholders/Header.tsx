import Col from '@/client/Col'
import Placeholder from '@/client/Placeholder'
import PlaceholderButton from '@/client/PlaceholderButton'
import Row from '@/client/Row'

export default function Header() {
	return <Placeholder as={Row} animation="wave">
		<Col sm={2}>
			<h3>
				<Placeholder sm={12} />
			</h3>
		</Col>
		<Col sm={2}>
			<h4>
				<PlaceholderButton size='sm' sm={3} />
			</h4>
		</Col>
	</Placeholder>
}
