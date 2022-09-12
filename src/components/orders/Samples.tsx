import { Field } from 'react-final-form'
import Input from '../Shared/Input'
import Label from '../inputLabel/Label'
import { OrderOptions } from '../../../interfaces'

type Props = {
    options: OrderOptions
}

const Samples = ({ options }: Props): JSX.Element => <tr>
    <td colSpan={5}>
        <Label name="samples" {...{ options }} />
    </td>
    <td>
        <Field name="samples_weight"
            type="number"
            disabled
            component={Input} />
    </td>
</tr>

export default Samples