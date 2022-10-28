import { FC } from 'react'
import type { CustomerWithOptions } from '../../interfaces/customers'

const Address: FC<CustomerWithOptions> = ({ object, options }) => {
  if (!object?.address) { return null }
  return <>{options?.address?.label}: {object.address}</>
}

export default Address
