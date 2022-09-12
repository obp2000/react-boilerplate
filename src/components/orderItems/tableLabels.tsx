import type { FormRenderProps } from 'react-final-form'
import { orderOrderItemOptions } from '../orders/hooks'
import AddOrderItemButton from './AddOrderItemButton'
import { OrderOptions, CommonConsts } from '../../../interfaces'

type Props = FormRenderProps & {
    options: OrderOptions
    commonConsts: CommonConsts
}

const TableLabels = (props: Props): JSX.Element => {
    const options = orderOrderItemOptions(props.options)
    return <tr>
        <th scope="col">
            №
        </th>
        <th scope="col">
            {options?.product.label}
        </th>
        <th scope="col">
            {options?.price.label}
        </th>
        <th scope="col">
            {options?.amount.label}
        </th>
        <th scope="col">
            {options?.cost.label}
        </th>
        <th scope="col">
            {options?.weight.label}
        </th>
        <th scope='col'>
            <AddOrderItemButton {...props} />
        </th>
    </tr>

}

export default TableLabels
