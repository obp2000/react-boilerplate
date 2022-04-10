import { ShortName } from './CustomerName'
import CityName from '../cities/CityName'

const TableData = {
    table: 'customers',
    fields: {
        id: ({ id }) => id,
        name: (object, { options }) => ShortName(object, options),
        city: ({ city }, {
            options: {
                city: {
                    children = {}
                } = {}
            } = {}
        }) => CityName(city, children),
        address: ({ address }) => address,
        created_at: ({ created_at }) => created_at
    }
}

export default TableData