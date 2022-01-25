import PropTypes from 'prop-types'
import React from 'react'
import { Label } from 'reactstrap'

const LabelComp = ({
        label_col_size,
        label_size,
        label,
        input: {
            name
        }
    }) =>
    <Label for={name} sm={label_col_size} size={label_size}>
        {label}
    </Label>

LabelComp.propTypes = {
	label_col_size: PropTypes.number,
	label_size: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string
}

export default LabelComp