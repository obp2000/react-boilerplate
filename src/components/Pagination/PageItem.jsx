import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { PaginationItem } from 'reactstrap'

const PageItem = ({
        label,
        to,
        active,
    }) =>
    <PaginationItem active={active}>
        <Link to={to} className="page-link">
            {label}
        </Link>
    </PaginationItem>

PageItem.propTypes = {
    label: PropTypes.string,
    to: PropTypes.object,
    active: PropTypes.bool,
}

export default PageItem