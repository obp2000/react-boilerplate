import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { PaginationItem } from 'reactstrap'
import querystring from 'querystring'

export const PaginationItemComp = ({
        active,
        to,
        label
    }) =>
    <PaginationItem {...{active}} >
        <Link {...{to}} className="page-link">
            {label}
        </Link>
    </PaginationItem>

PaginationItemComp.propTypes = {
    label: PropTypes.string,
    to: PropTypes.object,
    active: PropTypes.bool,
}

export default PaginationItemComp
