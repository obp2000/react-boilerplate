import PropTypes from 'prop-types'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TableName } from '../Shared/BasePathname'
import config from '../Config'
import { selectTextNew } from '../redux/CommonConsts'

const LinkToNew = () => {
    const { pathname } = useLocation()
    const text_new = useSelector(selectTextNew)
    return <Link to={`/${TableName(pathname) || config.BaseTable}/new`}
                className="btn btn-outline-primary btn-sm">
            {text_new}
        </Link>
}

export default LinkToNew
