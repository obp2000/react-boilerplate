import { FC } from 'react'
import type { CustomerWithOptions } from '../../interfaces/customers'
import Name from './Name'

const ShortName: FC<CustomerWithOptions> = ({ object, options }) => <>
  {object?.nick + ' '}
  <Name {...{ object, options }} />
</>

export default ShortName
