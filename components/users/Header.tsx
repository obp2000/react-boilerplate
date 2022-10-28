import { FC } from 'react'
import { CardTitle } from 'reactstrap'
import type { UserOptionsType } from '../../interfaces/users'

const Header: FC<UserOptionsType> = ({ options }) => <CardTitle>
  <h3>{options?.name_singular}</h3>
</CardTitle>

export default Header
