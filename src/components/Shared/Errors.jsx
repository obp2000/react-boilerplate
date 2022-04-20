import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'reactstrap'

const Errors = ({ submitError }) => {
    let errors = []
    if (submitError) {
        errors = submitError
    } else {
        const notAuthErrors = useSelector(({
            errors: {
                errors
            }
        }) => ({
            errors
        }))
        errors = notAuthErrors.errors
    }
    if (!errors) {
        return null
    }
    // console.log('errors: ', errors )
    return <Alert color="danger" role="alert">
            {errors.map((error, key) => <div key={key}>{error}</div>)}
        </Alert>
}

Errors.propTypes = {
    submitError: PropTypes.array,
}

export default Errors

export const Error = ({ message }) =>
    <Alert color="danger" role="alert">
        <div >{message}</div>
    </Alert>
