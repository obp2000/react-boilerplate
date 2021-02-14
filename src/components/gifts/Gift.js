import React from 'react'
import {Alert} from 'reactstrap'
import TextField from '../Shared/TextField'
import {GiftWeight, GiftText} from './Consts'

const Gift = () => <tr className='d-flex'>
        <td className="col-sm-2">
            <Alert color="danger">
                {GiftText}!
            </Alert>
        </td>
        <td className="col-sm-7">
            <TextField name='gift' label={GiftText}/>
        </td>
        <td className="col-sm-1 text-right"></td>
        <td className="col-sm-1 text-right">
            {GiftWeight}
        </td>
    </tr>

export default Gift