import PropTypes from 'prop-types'
import React from 'react'
import Loader from 'react-loader'
import {useGetUserQuery } from '../users/apiSlice'

const emptyObject = {}

const UserLabel = ({
	label,
	// signOutStatus
}) => {
    const {
        data: {
            username
        } = emptyObject,
        isFetching
    } = useGetUserQuery()
    const busy = isFetching
    return <Loader loaded={!busy}>
			{label} ({username})
		</Loader>
}

UserLabel.propTypes = {
    label: PropTypes.string,
}

export default UserLabel
