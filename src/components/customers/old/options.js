import {cityLabels} from '../cities/options'

export const customerCityOptions = ({
    city: {
        children
    } = {}
} = {}) => children

export const customerLabels = ({ name, address } = {}) => ({
    nameLabel: `${name?.label}:`,
    addressLabel: `${address?.label}:`,
})

// export const customerAndCityLabels = (options) => ({
//     ...customerLabels(options),
//     ...cityLabels(customerCityOptions(options)),
// })
