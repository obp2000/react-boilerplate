import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
import Input from '../Shared/Input'
import FloatingFormGroup from '../Shared/FloatingFormGroup'

const Condition = ({ when, is, children }) =>
    <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (value === is ? children : null)}
    </Field>

const Gift = props => <tr>
        <td>
            <Field name="need_gift" component="input"
                type="checkbox" hidden />
        </td>
        <td>
            <Field name="gift" {...props} component={FloatingFormGroup} />
        </td>
        <td/>
        <td/>
        <td/>
        <td>
            <Field name="gift_weight" type="number" disabled
                component={Input} />
        </td>
    </tr>

const GiftIfNeeded = props =>
    <Condition when="need_gift" is={true}>
        <Gift {...props} />
    </Condition>

export default GiftIfNeeded


// import React from 'react'
// import { Alert } from 'reactstrap'
// import TextField from '../Shared/TextField'
// import { GiftWeight, GiftText } from './Consts'

// const Gift = () => <tr className='d-flex'>
//         <td className="col-sm-2">
//             <Alert color="danger">
//                 {GiftText}!
//             </Alert>
//         </td>
//         <td className="col-sm-7">
//             <TextField name='gift' label={GiftText}/>
//         </td>
//         <td className="col-sm-1 text-right"></td>
//         <td className="col-sm-1 text-right">
//             {GiftWeight}
//         </td>
//     </tr>

// export default Gift