import { CardTitle } from 'reactstrap'
import { UserOptions } from '../../../interfaces'

type Props = {
  options?: UserOptions
}

const Header = ({ options }: Props) => <CardTitle>
  <h3>{options?.name_singular}</h3>
</CardTitle>

export default Header
