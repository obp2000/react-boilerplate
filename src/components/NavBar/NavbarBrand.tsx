import { NavbarBrand, Badge } from 'reactstrap'
import { useOptionsOuery } from '../options/hooks'

type Props = {
  indexUrl: string
}

const NavBarBrand = ({ indexUrl }: Props) => {
  const { commonConsts } = useOptionsOuery(indexUrl)
  return <NavbarBrand href="/">
    <h3>
      <Badge pill size='lg'>
        {commonConsts?.brand_text}
      </Badge>
    </h3>
  </NavbarBrand>
}

export default NavBarBrand
