import CityName from '../cities/CityName';

export const ShortName = ({
  nick,
  name,
} = {}, {
  name_label,
}) => {
  const customer_name = [nick];
  if (name) customer_name.push([name_label, name].join(' '));
  return customer_name.join(' ');
};

const CustomerName = ({
  city = null,
  address,
  ...short_customer
}, {
  address_label,
  ...rest_labels
}) => {
  const customer_name = [ShortName(short_customer, rest_labels)];
  if (city) customer_name.push(CityName(city, rest_labels));
  if (address) customer_name.push(`${address_label} ${address}`);
  return customer_name.join(' ');
};

export default CustomerName;
