import React from 'react'
import { NavbarBrand, Badge } from 'reactstrap'
import type { CommonConstsType } from '../../../interfaces'

const NavBarBrand =
  ({ commonConsts }: CommonConstsType) => <NavbarBrand href="/">
    <h3>
      <Badge pill size='lg'>
        {commonConsts?.brand_text}
      </Badge>
    </h3>
  </NavbarBrand>

export default NavBarBrand
