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
import {NavLink} from 'react-router-dom'
import Loader from 'react-loader'
import SearchForm from '../Search/SearchForm'
import AuthButton from '../auth/AuthButton'

const NavBar = ({
  commonConsts,
  isFetching
}) => {
    return <Loader loaded={!isFetching} >
      <Navbar color="primary"
        expand="md"
        dark
        className="py-0 mb-1" >
        <NavbarBrand href="/">
          <h3>
            <Badge pill size='lg'>{commonConsts?.brand_text}</Badge>
          </h3>
        </NavbarBrand>
        <NavbarToggler className="me-2"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation" />
        <Collapse navbar id="navbarContent">
          <Nav className="me-auto" navbar>
            {commonConsts?.main_menu?.map(({path: to, label}, key) =>
              <NavItem key={key}>
                <NavLink to={to} className={({isActive}) =>
                  'nav-link' + (isActive ? ' active' : '')}>
                  {label}
                </NavLink>
              </NavItem>,
            )}
            <NavItem>
              <AuthButton {...{commonConsts}} />
            </NavItem>
          </Nav>
          <SearchForm {...commonConsts} />
        </Collapse>
      </Navbar>
    </Loader>
}

NavBar.propTypes = {
  commonConsts: PropTypes.object,
  isFetching: PropTypes.bool,
}

export default NavBar
