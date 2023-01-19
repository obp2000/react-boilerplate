import 'server-only'

import Date from '@/Date'
import { AnyObjectType } from '@/interfaces/api'

export default function Title({
  object,
  title
}: AnyObjectType & { title: string }) {
  return <h3 aria-label={title}>
    {title}
    {object?.created_at && <Date dateString={String(object.created_at)} />}
  </h3>
}
