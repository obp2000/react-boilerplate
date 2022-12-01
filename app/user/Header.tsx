import 'server-only'

import CardTitle from '@/client/CardTitle'
import type { UserOptionsType } from '@/interfaces/users'

export default function Header({ options }: UserOptionsType) {
  return <CardTitle>
    <h3>{options?.name_singular}</h3>
  </CardTitle>
}
