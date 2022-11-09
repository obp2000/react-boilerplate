import PropTypes from 'prop-types'
import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Badge,
} from 'reactstrap'
import Loader from 'react-loader'
import SearchForm from '@/Search/SearchForm'
import NavLink from './NavLink'
import {useNavBar} from './hooks'

const NavBar = (props) => {
  const {
    brandText,
    mainMenu,
    isLoadingOptions,
    AuthButtonComp,
    authButtonLabel,
    searchLabel,
  } = useNavBar(props)
  return <Loader loaded={!isLoadingOptions}>
    <Navbar
      color="primary"
      expand="md"
      dark
      className="py-0 mb-1">
      <NavbarBrand href="/">
        <h3>
          <Badge pill size='lg'>{brandText}</Badge>
        </h3>
      </NavbarBrand>
      <NavbarToggler
        className="me-2"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation" />
      <Collapse navbar id="navbarContent">
        <Nav className="me-auto" navbar>
          {mainMenu?.map((menuItem, key) =>
            <NavItem key={key}>
              <NavLink {...menuItem} />
            </NavItem>
          )}
          <NavItem>
            <AuthButtonComp label={authButtonLabel} />
          </NavItem>
        </Nav>
        <SearchForm label={searchLabel} {...props} />
      </Collapse>
    </Navbar>
  </Loader>
}

NavBar.propTypes = {
  props: PropTypes.object,
}

export default NavBar
