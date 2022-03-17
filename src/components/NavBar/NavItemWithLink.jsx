import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import AuthButton from '../auth/AuthButton'

const NavItemWithLink = ({
    to,
    label,
    active
}) => {
    if (to.match(/(login|register|logout)/gi)) {
        return <AuthButton label={label}/>
    } else {
        return <Link to={to}
                  className={`nav-link${active ? ' active' : ''}`}
                  aria-current={active ? 'page' : null} >
                {label}
            </Link>
    }
}

NavItemWithLink.propTypes = {
    to: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.bool
}

export default NavItemWithLink