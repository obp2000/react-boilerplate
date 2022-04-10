import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLinkComp = ({ to, label }) => {
    // if (to.match(/(login|register|logout)/gi)) {
    //     return <AuthButton label={label}/>
    // } else {
        return <NavLink to={to} className="nav-link"
                        activeClassName="active">
                {label}
            </NavLink>
    // }
}

NavLinkComp.propTypes = {
    to: PropTypes.string,
    label: PropTypes.string,
}

export default NavLinkComp
