import PropTypes from 'prop-types'
import React from 'react'
import { NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const NavItemWithLink = ({ to, label, table }) => {
    let attrs = {}
    if (table ? to.includes(table) : to == '/') {
        attrs = {
            to,
            className: 'nav-link active',
            'aria-current': "page"
        }
    } else {
        attrs = {
            to,
            className: 'nav-link'
        }
    }
    return <NavItem>
				<Link {...attrs}>{label}</Link>
		   </NavItem>
}

NavItemWithLink.propTypes = {
    to: PropTypes.string,
    label: PropTypes.string,
    table: PropTypes.string
}

export default NavItemWithLink