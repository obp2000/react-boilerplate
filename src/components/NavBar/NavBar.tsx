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
import { useOptionsOuery } from '../options/hooks'
import type { IndexUrl } from '../../../interfaces'

const NavBar = ({ indexUrl }: IndexUrl) => {
  const { commonConsts } = useOptionsOuery(indexUrl)
  return <Navbar
    color="primary"
    expand="md"
    dark className="py-0 mb-1">
    <NavbarBrand {...{ commonConsts }} />
    <NavbarToggler />
    <Collapse navbar id="navbarContent">
      <Nav className="me-auto" navbar>
        <MainMenu {...{ commonConsts }} />
        <NavItem>
          <AuthButton {...{ commonConsts }} />
        </NavItem>
      </Nav>
      <SearchForm {...{ commonConsts }} />
    </Collapse>
  </Navbar>
}

export default NavBar
