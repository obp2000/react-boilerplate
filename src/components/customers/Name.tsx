import React from 'react'
import { Customer, CustomerOptions } from '../../../interfaces'

type Props = {
  object: Customer
  options?: CustomerOptions
}

const Name = ({ object, options }: Props): JSX.Element | null => {
  if (!object?.name) {
    return null
  }
  return <>{options?.name?.label}: {object.name}</>
}

export default Name
