import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
} from 'reactstrap'
// import Loader from 'react-loader'
import SearchForm from '../Search/SearchForm'
import NavbarBrand from './NavbarBrand'
import NavbarToggler from './NavbarToggler'
import MainMenu from './MainMenu'
import AuthButton from '../auth/AuthButton'
import {
  CommonConsts,
  CustomerOptions,
  ProductOptions,
  OrderOptions,
  UserOptions,
} from '../../../interfaces'

type Props = {
  options: CustomerOptions | ProductOptions | OrderOptions | UserOptions
  commonConsts: CommonConsts
  isLoadingOptions?: boolean
  isFetchingOptions?: boolean
  onSubmit: () => void
}

export default (props: Props) => {
  // console.log({props})
  return <Navbar color="primary" expand="md" dark className="py-0 mb-1">
      <NavbarBrand {...props} />
      <NavbarToggler />
      <Collapse navbar id="navbarContent">
        <Nav className="me-auto" navbar>
          <MainMenu {...props} />
  	      <NavItem>
            <AuthButton {...props} />
  	      </NavItem>
        </Nav>
        <SearchForm {...props} />
      </Collapse>
    </Navbar>
}
