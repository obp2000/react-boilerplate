import CityName from '../cities/CityName'

export const ShortName = ({name, nick}) => {
    let customer_name = []
    if (nick) {
        customer_name.push(nick)
    }
    if (name) {
        customer_name.push(`ФИО: ${name}`)
    }
    return customer_name.join(' ')
}

const CustomerName = ({
    nick,
    name,
    city = null,
    address
}) => {
    let customer_name = [ShortName({nick, name})]
    if (city) {
        customer_name.push(CityName(city))
    }
    if (address) {
        customer_name.push(`Адрес: ${address}`)
    }
    return customer_name.join(' ')
}

export default CustomerName