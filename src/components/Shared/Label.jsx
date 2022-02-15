import PropTypes from 'prop-types'
import React from 'react'
import { Label } from 'reactstrap'

const LabelComp = ({
    label_col_size,
    label_size,
    label,
    required,
    input = {},
    options,
    ...rest
}) => {
    const name = input.name || rest.name
    if (options) {
        const field = options[name] || {}
        label = field.label
        required = field.required
    }
    return <Label for={name} sm={label_col_size} size={label_size}>
        {label}{required ? '*' : ''}
    </Label>
}

LabelComp.propTypes = {
    label_col_size: PropTypes.number,
    label_size: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    // name: PropTypes.string
}

export default LabelComp