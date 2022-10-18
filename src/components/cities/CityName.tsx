import type { CityWithOptions } from '../../../interfaces/cities'
import Pindex from './Pindex'

const CityName = ({ object, options }: CityWithOptions) => {
  if (!object) { return null }
  return <>
    <Pindex {...{ object, options }} />
    {' ' + object.city}
  </>
}

export default CityName
