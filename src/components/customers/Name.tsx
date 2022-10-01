import React from 'react'
import type { CustomerWithOptions} from '../../../interfaces'

const Name = ({ object, options }: CustomerWithOptions): JSX.Element | null => {
  if (!object?.name) { return null }
  return <>{options?.name?.label}: {object.name}</>
}

export default Name
