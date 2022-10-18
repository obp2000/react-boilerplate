import React from 'react'
import type { CustomerWithOptions } from '../../../interfaces/customers'

const Address = ({
  object,
  options
}: CustomerWithOptions): JSX.Element | null => {
  if (!object?.address) {
    return null
  }
  return <>{options?.address?.label}: {object.address}</>
}

export default Address
