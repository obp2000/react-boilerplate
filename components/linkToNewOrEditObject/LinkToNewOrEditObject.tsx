import 'server-only'

import { AnyObjectType } from '@/interfaces/api'
import Link from 'next/link'
import { IndexUrl } from '@/interfaces/index'
import { CommonConstsType } from '@/interfaces/commonConsts'

export default async function LinkToNewOrEditObject({
  object,
  indexUrl,
  commonConsts
}: AnyObjectType & IndexUrl & CommonConstsType) {
  const label = object?.id ? commonConsts?.edit : commonConsts?.new
  return <Link
    className='btn btn-outline-primary btn-sm'
    href={`${indexUrl}${object?.id || 'new'}`}
    aria-labelledby={label}
    // prefetch={false}
  >
    {label}
  </Link>
}
