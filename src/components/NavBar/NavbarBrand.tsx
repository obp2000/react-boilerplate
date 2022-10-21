import { FC, useContext } from 'react'
import { Badge, NavbarBrand } from 'reactstrap'
import { OptionsContext } from '../layout/Layout'

const NavBarBrand: FC = () => {
  const { commonConsts } = useContext(OptionsContext)
  return <NavbarBrand href="/">
    <h3>
      <Badge pill size='lg'>
        {commonConsts?.brand_text}
      </Badge>
    </h3>
  </NavbarBrand>
}

export default NavBarBrand
