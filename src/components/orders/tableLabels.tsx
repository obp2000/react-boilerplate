import { useOptionsOuery } from '../options/hooks'

type Props = {
    indexUrl: string
}

export default ({ indexUrl }: Props): JSX.Element => {
    const { options } = useOptionsOuery(indexUrl)
    return <>
        <th scope="col">
            {options?.id.label}
        </th>
        <th scope="col">
            {options?.customer.label}
        </th>
        <th scope="col">
            {options?.order_items_cost.label}
        </th>
        <th scope="col">
            {options?.created_at.label}
        </th>
        <th scope="col">
            {options?.updated_at.label}
        </th>
    </>
}
