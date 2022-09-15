import React from 'react'
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

export type Props = {
  indexUrl: string
}

const NavBar = (props: Props) => <Navbar
  color="primary"
  expand="md"
  dark className="py-0 mb-1">
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

export default NavBar
