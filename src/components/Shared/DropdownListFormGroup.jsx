import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup, Col } from 'reactstrap'
import DropdownList from './DropdownList'
import Label from './Label'

const DropdownListFormGroup = ({
        label_col_size,
        ...rest
    }) => params =>
        <FormGroup row>
            <Label {...{label_col_size, ...params}} />
            <Col>
                <DropdownList {...{...rest, ...params}} />
            </Col>
        </FormGroup>

export default DropdownListFormGroup



// const RowFormGroup = params =>
//     <FormGroup row>
//         <Label {...{label_col_size: 4, ...params}} />
//         <Col>
//             <Input {...params}/>
//         </Col>
//     </FormGroup>

// export default RowFormGroup