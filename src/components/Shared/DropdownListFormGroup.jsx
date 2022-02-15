import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup, Col } from 'reactstrap'
import DropdownList from './DropdownList'
import Label from './Label'

const DropdownListFormGroup = settings => props => {
        // console.log('params: ', props)
        return <FormGroup row>
            <Label {...settings} {...props} />
            <Col>
                <DropdownList {...settings} {...props} />
            </Col>
        </FormGroup>
    }

export default DropdownListFormGroup
