import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { PaginationItem } from 'reactstrap'
import ActiveItem from './ActiveItem'

const PageItem = ({
        label,
        to,
        active
    }) => {
        const Comp = active ? ActiveItem : Link
        return <Comp to={to} className="page-link">
                    {label}
                </Comp>
    }

PageItem.propTypes = {
    label: PropTypes.string,
    to: PropTypes.object,
    active: PropTypes.bool,
}

export default PageItem