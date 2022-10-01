import React from 'react'
import Name from './Name'
import type { CustomerWithOptions } from '../../../interfaces'

const ShortName = ({ object, options }: CustomerWithOptions): JSX.Element => <>
  {object?.nick + ' '}
  <Name {...{ object, options }} />
</>

export default ShortName
