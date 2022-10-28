import { FC } from 'react'
import type { CustomerWithOptions } from '../../interfaces/customers'

const Name: FC<CustomerWithOptions> = ({ object, options }) => {
  if (!object?.name) { return null }
  return <>{options?.name?.label}: {object.name}</>
}

export default Name
