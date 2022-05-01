import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectBasePathname } from '../redux/Router'
import { selectCommonConsts } from '../redux/CommonConsts'

const LinkToNew = () =>
    <Link to={`${useSelector(selectBasePathname)}new`}
            className="btn btn-outline-primary btn-sm">
        {useSelector(selectCommonConsts).new}
    </Link>

export default LinkToNew
