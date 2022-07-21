import PropTypes from 'prop-types'
import React from 'react'
import {NavLink} from 'react-router-dom'

const className = ({isActive}) => 'nav-link' + (isActive ? ' active' : '')

const NavLinkComp = ({
  path: to,
  label
}) => <NavLink {...{to, className}}>
      	{label}
      </NavLink>

NavLinkComp.propTypes = {
  to: PropTypes.string,
  label: PropTypes.string,
}

export default NavLinkComp
