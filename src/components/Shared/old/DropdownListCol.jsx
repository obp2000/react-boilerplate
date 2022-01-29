import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup, Col } from 'reactstrap'
import DropdownList from './DropdownList'
import Label from './Label'

const DropdownListCol = ({
        label_col_size,
        ...rest
    }) => params =>
    <Col sm={params.size}>
        <FormGroup row>
            <Label {...{label_col_size, ...params}} />
            <Col>
                <DropdownList {...{...rest, ...params}} />
            </Col>
        </FormGroup>
    </Col>

export default DropdownListCol