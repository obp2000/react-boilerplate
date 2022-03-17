import PropTypes from 'prop-types'
import React from 'react'
import { Label } from 'reactstrap'

const LabelComp = ({
    input: {
        name: input_name,
        ...input
    } = {},
    name = input_name,
    options: {
        [name]: field_props = {}
    } = {},
    label = field_props.label,
    required = field_props.required,
    label_col_size: sm,
    label_size: size,
    check
}) => <Label {...{for: name,
                  sm,
                  size,
                  check}}
      >
        {label}{required ? '*' : ''}
      </Label>

LabelComp.propTypes = {
    input_name: PropTypes.string,
    name: PropTypes.string,
    field_props: PropTypes.object,
    label: PropTypes.string,
    required: PropTypes.bool,
    label_col_size: PropTypes.number,
    label_size: PropTypes.string,
}

export default LabelComp