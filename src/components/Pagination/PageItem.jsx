import PropTypes from 'prop-types'
import React from 'react'
import {
    Link
} from 'react-router-dom'

const PageItem = ({label, pathname, className, search}) => <li className={className}>
        <Link
            to={{
            pathname,
            search
            }} 
            className="page-link">{label}
        </Link>
    </li>

PageItem.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string
}

export default PageItem
