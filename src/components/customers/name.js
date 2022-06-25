import cityName from '../cities/name'

export const shortName = ({
  nick,
  name,
} = {}, {
  nameLabel,
}) => {
  const customerName = [nick]
  if (name) customerName.push([nameLabel, name].join(' '))
  return customerName.join(' ')
}

const customerName = ({
  city = null,
  address,
  ...shortCustomer
}, {
  addressLabel,
  ...restLabels
}) => {
  const customerName = [shortName(shortCustomer, restLabels)]
  if (city) customerName.push(cityName(city, restLabels))
  if (address) customerName.push(`${addressLabel} ${address}`)
  return customerName.join(' ')
}

export default customerName
