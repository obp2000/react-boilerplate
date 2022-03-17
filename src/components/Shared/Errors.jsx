import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'reactstrap'

const Errors = ({ authErrors }) => {
    let errors = []
    if (authErrors) {
        errors = authErrors
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
    authErrors: PropTypes.array,
}

export default Errors