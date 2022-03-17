import CityName from '../cities/CityName'

export const ShortName = ({
    name,
    nick
}, {
    name: {
        label: name_label
    } = {}
} = {}) => {
    let customer_name = [nick]
    if (name) {
        customer_name.push(
            `${name_label}: ${name}`
        )
    }
    return customer_name.join(' ')
}

const CustomerName = ({
    nick,
    name,
    city = null,
    address
}, {
    city: city_options = {},
    address: {
        label: address_label
    } = {},
    ...customer_props
} = {}) => {
    let customer_name = [ShortName({ nick, name }, customer_props)]
    if (city) {
        customer_name.push(
            CityName(city, city_options.children)
        )
    }
    if (address) {
        customer_name.push(
            `${address_label}: ${address}`
        )
    }
    return customer_name.join(' ')
}

export default CustomerName