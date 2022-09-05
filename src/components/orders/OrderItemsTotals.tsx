import {Field} from 'react-final-form'
import Input from '../Shared/Input'
import OrderItemsTotalText from './OrderItemsTotalText'
import {OrderOptions} from '../../../interfaces'

type Props = {
  options: OrderOptions
}

export default function (props: Props): JSX.Element {
    return <tr>
        <td colSpan={3}>
            <OrderItemsTotalText {...props} />
        </td>
        <td>
            <Field name="order_items_amount"
                type="number"
                disabled
                component={Input} />
        </td>
        <td>
            <Field name="order_items_cost"
                type="number"
                disabled
                component={Input} />
        </td>
        <td>
            <Field name="order_items_weight"
                type="number"
                disabled
                component={Input} />
        </td>
    </tr>
}
