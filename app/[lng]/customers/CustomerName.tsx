import { useTranslation } from '@/app/i18n/client'
import { CustomersSelect } from '@/interfaces/api'
import CityName from './cities/CityName'
import ShortName from './ShortName'

export default function CustomerName({
  object,
  lng
}: { object?: CustomersSelect } & { lng: string }) {
  const { t } = useTranslation(lng, 'customer')
  return <>
    <ShortName {...{ object, lng }} />{' '}
    <CityName object={object?.city} {...{ lng}} />{' '}
    {object?.address && `${t('address')}: ${object.address}`}
  </>
}
