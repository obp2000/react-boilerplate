import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { TableName } from '../Shared/BasePathname'
import config from '../Config'

const LinkToEdit = ({
    id,
    location: {
        pathname
    },
    edit: text_edit
}) =>   <Link   to={`/${TableName(pathname) || config.BaseTable}/${id}`}
                className="btn btn-outline-primary btn-sm">
            {text_edit}
        </Link>

LinkToEdit.propTypes = {
    id: PropTypes.number
}

export default LinkToEdit