import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup, Col } from 'reactstrap'
import DropdownList from './DropdownList'
import Label from './Label'

const DropdownListFormGroup = ({
        label_col_size,
        ...rest
    }) => params => {
        // console.log('params: ', params)
        // console.log('rest: ', rest)
        return <FormGroup row>
            <Label {...{label_col_size, ...params}} />
            <Col>
                <DropdownList {...{...rest, ...params}} />
            </Col>
        </FormGroup>
    }

export default DropdownListFormGroup
