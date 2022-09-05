import {NavItem} from 'reactstrap'
import NavLink from './NavLink'
import {CommonConsts} from '../../../interfaces'

type Props = {
  options: object
  commonConsts: CommonConsts
  isLoadingOptions?: boolean
  isFetchingOptions?: boolean
}

export default ({commonConsts}: Props): JSX.Element => <>
  {commonConsts?.main_menu?.map((mainMenuItem, key) =>
    <NavItem key={key}>
      <NavLink {...mainMenuItem} />
    </NavItem>)}
</>
