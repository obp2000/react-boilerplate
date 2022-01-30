import PropTypes from 'prop-types'
import React from 'react'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'
import WrapInCol from '../Shared/WrapInCol'

const DeliveryTypeField = DropdownListFormGroup({
    label_col_size: 2,
    dataKey: 'value',
    textField: 'display_name'
})

export default WrapInCol(DeliveryTypeField)

// const DeliveryTypeField = params =>
//     <Col sm={params.size}>
//         <FormGroup row>
//             <Label {...{label_col_size: 2, ...params}} />
//             <Col>
//                 <DropdownList {...{dataKey: 'id', textField: 'label', ...params}} />
//             </Col>
//         </FormGroup>
//     </Col>


                // <Label for={params.input.name} sm={2}>
                //     {params.label}
                // </Label>

//   <option value="" />
//   {delivery_types.map((delivery_type, index) =>
//       <option key={index} value={delivery_type.value}>
//           {delivery_type.label}
//       </option>)}
// </Field>

                    // <DropdownList
                    //     {...input}
                    //     id={input.name}
                    //     placeholder={label}
                    //     dataKey='id'
                    //     textField='label'
                    //     data={delivery_types}
                    //     filter={"contains"}
                    //     invalid={(meta.touched && !!meta.error) ? 'true' : null}
                    //     valid={(meta.touched && !meta.error) ? 'true' : null}
                    //     messages={WidgetMessages}
                    //     />
                    // <WidgetErrors {...meta} />