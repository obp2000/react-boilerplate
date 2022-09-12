import ShortName from './ShortName'
import CityName from '../cities/CityName'
import Date from '../Shared/date'
import { useOptionsOuery } from '../options/hooks'
import { Customer } from '../../../interfaces'

type Props = {
    object: Customer
    indexUrl: string
}

const TableRow = ({ object, indexUrl }: Props): JSX.Element => {
    const { options } = useOptionsOuery(indexUrl)
    return <>
        <td scope="row">
            {object.id}
        </td>
        <td scope="row">
            <ShortName {...{ object, options }} />
        </td>
        <td scope="row">
            <CityName object={object.city} options={options?.city.children} />
        </td>
        <td scope="row">
            {object.address}
        </td>
        <td scope="row">
            <Date dateString={object.created_at} />
        </td>
        <td scope="row">
            <Date dateString={object.updated_at} />
        </td>
    </>
}

export default TableRow
