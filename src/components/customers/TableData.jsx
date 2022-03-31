import { ShortName } from './CustomerName'
import CityName from '../cities/CityName'

const TableData = {
    id: ({ id }) => id,
    name: (object, { options }) => ShortName(object, options),
    city: ({ city }, { options }) => CityName(city, options),
    address: ({ address }) => address,
    created_at: ({ created_at }) => created_at
}

export default TableData
