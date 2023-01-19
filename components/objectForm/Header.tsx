import 'server-only'

import BackButton from '@/backButton/BackButton'
import Date from '@/Date'
import {
  CustomerSelect, IdParam,
  OrderSelect, ProductSelect
} from '@/interfaces/api'
import { TFunction } from 'i18next'

export default function Header({
  id,
  object,
  t,
  name
}: IdParam & { object?: CustomerSelect | ProductSelect | OrderSelect | null } &
  { t: TFunction } & { name: string }
) {
  const title = id === 'new'
    ? `${t('new')} ${t(name).toLowerCase()} `
    : `${t(name)} № ${id} ${t('from').toLowerCase()} `
  // console.log('title in header', title)
  return <div className='columns-3'>
    <BackButton label={t('back')} />
    <h3 aria-label={title}>
      {title}
      {object?.created_at && <Date dateString={String(object.created_at)} />}
    </h3>
  </div>
}
