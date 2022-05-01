import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCommonConsts } from '../redux/CommonConsts'
import { selectBasePathname } from '../redux/Router'

const LinkToEdit = ({ id }) =>
    <Link   to={`${useSelector(selectBasePathname)}${id}`}
            className="btn btn-outline-primary btn-sm">
        {useSelector(selectCommonConsts).edit}
    </Link>

LinkToEdit.propTypes = {
    id: PropTypes.number,
}

export default LinkToEdit
