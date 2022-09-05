import { useOptionsOuery } from '../options/hooks'

type Props = {
    indexUrl: string
}

export default ({ indexUrl }: Props): JSX.Element | null => {
    const { options } = useOptionsOuery(indexUrl)
    if (!options) { return null }
    return <>
        <th scope="col">
            {options.id.label}
        </th>
        <th scope="col">
            {options.name.label}
        </th>
        <th scope="col">
            {options.city.label}
        </th>
        <th scope="col">
            {options.address.label}
        </th>
        <th scope="col">
            {options.created_at.label}
        </th>
        <th scope="col">
            {options.updated_at.label}
        </th>
    </>
}
