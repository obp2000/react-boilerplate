import PropTypes from 'prop-types'
import React from 'react'
import {NavLink} from 'react-router-dom'
import {useNavLink} from './hooks'

const NavLinkComp = (props) => {
  const {to, className, label} = useNavLink(props)
  return <NavLink {...{to, className}}>
    {label}
  </NavLink>
}

NavLinkComp.propTypes = {
  props: PropTypes.object,
}

export default NavLinkComp
