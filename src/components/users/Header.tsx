import React from 'react'
import { CardTitle } from 'reactstrap'
import type { UserOptionsType } from '../../../interfaces/users'

const Header = ({ options }: UserOptionsType) => <CardTitle>
  <h3>{options?.name_singular}</h3>
</CardTitle>

export default Header
