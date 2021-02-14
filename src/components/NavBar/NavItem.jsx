import PropTypes from 'prop-types'
import React from 'react'

const NavItem = ({
	children, 
	placement, 
	className
}) => {
    const _className = 'nav-item' + (className
        ? ' ' + className
        : '')
    return <li className={_className} placement={placement}>
        {children}
    </li>
}

NavItem.propTypes = {
    placement: PropTypes.string,
    className: PropTypes.string
}

export default NavItem