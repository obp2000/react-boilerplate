import React from 'react'
import { CardTitle } from 'reactstrap'
import { UserOptionsType } from '../../../interfaces'

const Header = ({ options }: UserOptionsType) => <CardTitle>
  <h3>{options?.name_singular}</h3>
</CardTitle>

export default Header
