import {ConditionGte} from '../Shared/FormConditions'
import {OrderOptions} from '../../../interfaces'

type Props = {
  options: OrderOptions
}

export default function ({ options }: Props): JSX.Element {
    return <span>
        {options?.order_items_cost.label}
        <ConditionGte   when="order_items_cost"
                        gte={options?.Consts?.SUM_FOR_GIFT}>
            {' - '}{options?.need_gift.label}
        </ConditionGte>
    </span>
}
