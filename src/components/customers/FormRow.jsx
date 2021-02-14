import PropTypes from 'prop-types'
import React from 'react'

const FormRow = ({label, children}) => {
    return <div className="form-group row">
        <label className="col-sm-2 col-form-label">{label}</label>
        <div className="col-sm-10">
            {children}
        </div>
    </div>
}

FormRow.propTypes = {
    label: PropTypes.string
}

export default FormRow