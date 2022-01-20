import PropTypes from 'prop-types'
import React from 'react'
import { Input } from 'reactstrap'
import { Field } from 'react-final-form'
import dropdownListComponent from '../Shared/renderDropdownList'
import { PostPackets } from './Consts'

const PostPacketField = () =>
    <Field
        name='packet'
        component={dropdownListComponent}
        data={PostPackets}
        textField='name'
        // dataKey='id'
        filter={"contains"}
    />

export default PostPacketField

// const PostPacketField = ({ input: { name } }) =>
//     <Input type="select" name={name}>
//         <option value="" />
//         {Packets.map((packet, index) =>
//             <option key={index} value={packet}>
//                 {packet}
//             </option>)}
//     </Input>