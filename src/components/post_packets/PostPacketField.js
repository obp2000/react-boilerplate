import PropTypes from 'prop-types'
import React from 'react'
import { Input } from 'reactstrap'
import { Field } from 'react-final-form'
import dropdownListComponent from '../renderDropdownList'
import { Packets } from './Consts'

// const PostPacketField = ({ input: { name } }) =>
//     <Input type="select" name={name}>
//         <option value="" />
//         {Packets.map((packet, index) =>
//             <option key={index} value={packet}>
//                 {packet}
//             </option>)}
//     </Input>

const PostPacketField = ({
    delivery_types,
}) => <Field
        name='packet'
        component={dropdownListComponent}
        data={Packets}
        textField='name'
        // dataKey='id'
        filter={"contains"}
        />

export default PostPacketField