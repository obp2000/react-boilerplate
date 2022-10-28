import { FC } from 'react'
import { Form } from 'react-final-form'
import { Collapse, Nav, Navbar, NavItem } from 'reactstrap'
// import Loader from 'react-loader'
import AuthButton from '../auth/AuthButton'
import { useSearchForm } from '../search/hooks'
import MainMenu from './MainMenu'
import NavbarBrand from './NavbarBrand'
import NavbarToggler from './NavbarToggler'

const NavBar: FC = () => <Navbar
  color="primary"
  expand="md"
  dark className="py-0 mb-1">
  <NavbarBrand />
  <NavbarToggler />
  <Collapse navbar id="navbarContent">
    <Nav className="me-auto" navbar>
      <MainMenu />
      <NavItem>
        <AuthButton />
      </NavItem>
    </Nav>
    <Form {...useSearchForm()} />
  </Collapse>
</Navbar>

export default NavBar
