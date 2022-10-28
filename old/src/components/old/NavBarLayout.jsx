import PropTypes from 'prop-types'
import React, {lazy} from 'react'
import {Outlet, useOutletContext} from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Badge,
} from 'reactstrap'

const NavBarLayout = (props) => {
  const layoutContext = useOutletContext()
  const context = {...layoutContext, ...props}
  // console.log('props ', props)
  // console.log('layoutContext ', layoutContext)
  return <>
    <Outlet {...{context}} />
  </>
}

NavBarLayout.propTypes = {
  props: PropTypes.object,
}

export default NavBarLayout
