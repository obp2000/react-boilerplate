import PropTypes from 'prop-types'
import React from 'react'
import {Link} from 'react-router-dom'

const NavItemWithLink = ({to, label}) =>
	<Link to={to} className="nav-link">
		{label}
	</Link>

NavItemWithLink.propTypes = {
    to: PropTypes.string,
    label: PropTypes.string
}

export default NavItemWithLink