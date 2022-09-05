import {Field} from 'react-final-form'
import Input from '../Shared/Input'
import Label from '../Shared/Label'
import {OrderOptions} from '../../../interfaces'

type Props = {
    options: OrderOptions
}

export default ({options}: Props): JSX.Element => <tr>
        <td colSpan={5}>
            <Label name="samples" {...{options}} />
        </td>
        <td>
            <Field name="samples_weight"
                type="number"
                disabled
                component={Input} />
        </td>
    </tr>
