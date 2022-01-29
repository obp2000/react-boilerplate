import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { TableName } from '../Shared/BasePathname'
import config from '../Config'

const LinkToEdit = ({
    id,
    location: {
        pathname
    }
}) =>   <Link to={`/${TableName(pathname) || config.BaseTable}/${id}`}
                className="btn btn-outline-primary btn-sm">
            Редактировать
        </Link>

LinkToEdit.propTypes = {
    id: PropTypes.number
}

export default LinkToEdit