import React from 'react'
import { Customer, CustomerOptions } from '../../../interfaces'

type Props = {
  object: Customer
  options: CustomerOptions
}

const Address = ({ object, options }: Props): JSX.Element | null => {
  if (!object?.address) {
    return null
  }
  return <>{options?.address?.label}: {object.address}</>
}

export default Address
