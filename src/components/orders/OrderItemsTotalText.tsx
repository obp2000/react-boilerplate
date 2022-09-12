import { ConditionGte } from '../Shared/FormConditions'
import { OrderOptions } from '../../../interfaces'

type Props = {
    options: OrderOptions
}

const OrderItemsTotalText = ({ options }: Props): JSX.Element => <span>
    {options?.order_items_cost.label}
    <ConditionGte when="order_items_cost"
        gte={options?.Consts?.SUM_FOR_GIFT}>
        {' - '}{options?.need_gift.label}
    </ConditionGte>
</span>

export default OrderItemsTotalText
