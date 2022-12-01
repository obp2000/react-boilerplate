import type { CustomerWithOptions } from '@/interfaces/customers'
import Name from './Name'

export default function ShortName({ object, options }: CustomerWithOptions) {
  return <>
    {object?.nick + ' '}
    <Name {...{ object, options }} />
  </>
}
