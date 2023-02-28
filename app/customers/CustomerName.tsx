import { Translation } from '@/app/i18n/dictionaries'
import type { Customer } from './helpers'
import CityName from './cities/CityName'
import ShortName from './ShortName'

export default function CustomerName({
  object,
  labels
}: {
  object?: Customer
  labels: Translation['customer']
}) {
  return <>
    <ShortName {...{ object, labels }} />{' '}
    <CityName object={object?.city} labels={labels.city} />{' '}
    {object?.address && `${labels.address}: ${object.address}`}
  </>
}
