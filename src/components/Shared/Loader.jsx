import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import Loader from 'react-loader'

const LoaderComp = ({ children }) => {
    const loaded = useSelector(({
        temp_state: {
            isFetching
        }
    }) => ({
        isFetching
    }))
    return <Loader loaded={!loaded.isFetching} >
			{children}
		</Loader>
}

export default LoaderComp
