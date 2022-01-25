import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup, Col } from 'reactstrap'
import DropdownList from '../Shared/DropdownList'
import { PostPackets as search_results } from './Consts'
import Label from '../Shared/Label'

const PostPacketField = params =>
    <Col sm={params.size}>
            <FormGroup row>
                <Label {...{label_col_size: 2, ...params}} />
                <Col>
                    <DropdownList {...{textField: 'name', search_results, ...params}} />
                </Col>
            </FormGroup>
        </Col>

export default PostPacketField


                // <Label for={params.input.name} sm={2}>
                //     {params.label}
                // </Label>

                    // <DropdownList
                    //     {...input}
                    //     id={input.name}
                    //     placeholder={label}
                    //     // dataKey='id'
                    //     textField='name'
                    //     data={PostPackets}
                    //     filter={"contains"}
                    //     invalid={(meta.touched && !!meta.error) ? 'true' : null}
                    //     valid={(meta.touched && !meta.error) ? 'true' : null}
                    //     messages={WidgetMessages}
                    //     />
                    // <WidgetErrors {...meta} />



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
