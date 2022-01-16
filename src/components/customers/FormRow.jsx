import PropTypes from 'prop-types'
import React from 'react'

const FormRow = ({label, strong_label, children}) => {
    const label_class = `col-sm-2 col-form-label${strong_label ? ' font-weight-bold' : ''}`
    return <div className="form-group row">
        <label className={label_class}>{label}</label>
        <div className="col-sm-10">
            {children}
        </div>
    </div>
}

FormRow.propTypes = {
    label: PropTypes.string
}

export default FormRow