import Placeholder from '@/client/Placeholder'
import PaginationItem from '@/client/PaginationItem'
import PlaceholderButton from '@/client/PlaceholderButton'

export default function PaginationItemPlaceholder() {
	return <Placeholder as={PaginationItem} animation="glow">
				<PlaceholderButton variant="primary" sm={1} />
			</Placeholder>
}
