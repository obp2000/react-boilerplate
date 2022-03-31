import PropTypes from 'prop-types'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TableName } from '../Shared/BasePathname'
import config from '../Config'

const LinkToEdit = ({
    id,
    edit: text_edit
}) => {
    const { pathname } = useLocation()
    return <Link   to={`/${TableName(pathname) || config.BaseTable}/${id}`}
                className="btn btn-outline-primary btn-sm">
            {text_edit}
        </Link>
}

LinkToEdit.propTypes = {
    id: PropTypes.number,
    edit: PropTypes.string
}

export default LinkToEdit