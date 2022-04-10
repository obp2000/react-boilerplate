import PropTypes from 'prop-types'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TableName } from '../Shared/BasePathname'
import config from '../Config'
import { selectTextEdit } from '../redux/CommonConsts'

const LinkToEdit = ({
    id,
}) => {
    const { pathname } = useLocation()
    const text_edit = useSelector(selectTextEdit)
    return <Link   to={`/${TableName(pathname) || config.BaseTable}/${id}`}
                className="btn btn-outline-primary btn-sm">
            {text_edit}
        </Link>
}

LinkToEdit.propTypes = {
    id: PropTypes.number,
}

export default LinkToEdit