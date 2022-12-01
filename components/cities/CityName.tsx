import type { CityWithOptions } from '@/interfaces/cities'
import Pindex from './Pindex'

export default function CityName({ object, options }: CityWithOptions) {
  if (!object) { return null }
  return <>
    <Pindex {...{ object, options }} />
    {' ' + object.city}
  </>
}
