import { NavbarBrand, Badge } from 'reactstrap'
import { CommonConsts } from '../../../interfaces'

type Props = {
  options: object
  commonConsts: CommonConsts
  isLoadingOptions?: boolean
  isFetchingOptions?: boolean
}

export default ({ commonConsts }: Props) => <NavbarBrand href="/">
  <h3>
    <Badge pill size='lg'>
      {commonConsts?.brand_text}
    </Badge>
  </h3>
</NavbarBrand>
