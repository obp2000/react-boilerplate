import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { TableName } from '../Shared/BasePathname'
import config from '../Config'

const LinkToNew = ({
    location: {
        pathname
    }
}) =>   <Link to={`/${TableName(pathname) || config.BaseTable}/new`}
                className="btn btn-outline-primary btn-sm">
            Новый
        </Link>

export default LinkToNew