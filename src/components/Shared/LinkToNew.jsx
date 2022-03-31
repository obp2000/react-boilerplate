import PropTypes from 'prop-types'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TableName } from '../Shared/BasePathname'
import config from '../Config'

const LinkToNew = ({
    ['new']: text_new
}) => {
    const { pathname } = useLocation()
    return <Link to={`/${TableName(pathname) || config.BaseTable}/new`}
                className="btn btn-outline-primary btn-sm">
            {text_new}
        </Link>
}

export default LinkToNew