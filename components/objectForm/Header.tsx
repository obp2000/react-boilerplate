import 'server-only'

import type { Translation } from '@/app/i18n/dictionaries'
import type { Customer } from '@/app/[lng]/customers/[id]/helpers'
import type { Order } from '@/app/[lng]/orders/[id]/helpers'
import type { Product } from '@/app/[lng]/products/[id]/helpers'
import BackButton from '@/backButton/BackButton'
import Date from '@/Date'
import { ParsedUrlQuery } from 'querystring'

export default function Header({
  object,
  dict,
  isNewObject,
  params,
  name,
}: { isNewObject: boolean } & { params: ParsedUrlQuery } &
  { object?: Customer | Product | Order | null } &
  { dict: Translation } & { name: string }
) {
  // const { label } = getProps(props)
  const title = isNewObject
    ? `${dict.new} ${name.toLowerCase()} `
    : `${name} № ${params.id} ${dict.from?.toLowerCase()} `
  return <div className='columns-3'>
    <BackButton label={dict.back} />
    <h3 aria-label={title}>
      {title}
      {object?.created_at && <Date dateString={String(object.created_at)} />}
    </h3>
  </div>
}
