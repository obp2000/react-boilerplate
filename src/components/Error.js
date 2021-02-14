import PropTypes from 'prop-types'
import React from 'react'

const Error = ({errors}) => {
    if (!errors) {
        return null
    }
    return <div className="form-group row">
        <div className="alert alert-danger col-sm-10 offset-sm-1" role="alert">
            {errors.map((error, index) => {
                return <div key={index}>{error}</div>
            })}
        </div>
    </div>
}

Error.propTypes = {
    errors: PropTypes.array
}

export default Error
