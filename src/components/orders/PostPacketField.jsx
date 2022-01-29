import PropTypes from 'prop-types'
import React from 'react'
// import { PostPackets as search_results } from './Consts'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'
import WrapInCol from '../Shared/WrapInCol'

const PostPacketField = DropdownListFormGroup({
    label_col_size: 2,
    dataKey: 'id',
    textField: 'label'
})

export default WrapInCol(PostPacketField)


// const PostPacketField = ({ input: { name } }) =>
//     <Input type="select" name={name}>
//         <option value="" />
//         {Packets.map((packet, index) =>
//             <option key={index} value={packet}>
//                 {packet}
//             </option>)}
//     </Input>

    // <Field
    //     name='packet'
    //     component={dropdownListComponent}
    //     data={PostPackets}
    //     textField='name'
    //     // dataKey='id'
    //     filter={"contains"}
    // />
