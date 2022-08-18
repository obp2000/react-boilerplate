import PropTypes from 'prop-types'
import Link from 'next/link'
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

const NavBar = (props) => {
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
  {/* </Loader>*/}
}

NavBar.propTypes = {
  props: PropTypes.object,
}

export default NavBar


// const {
//   isLoading,
//   isError,
//   data: {
//     commonConsts,
//     options,
//   } = emptyObject,
// } = useGetOptionsQuery('/customers/', {skip: isFallback,})
// if (isError) return null
