import 'server-only'

import { AnyObjectType } from '@/interfaces/api'
import Link from 'next/link'
import { CommonConstsType } from '@/interfaces/commonConsts'
import path from 'path'

export default function LinkToNewOrEditObject({
  object,
  commonConsts
}: AnyObjectType & CommonConstsType) {
  const label = object?.id ? commonConsts?.edit : commonConsts?.new
  return <Link
    className='btn btn-outline-primary btn-sm'
    href={`/${path.basename(__dirname)}/${object?.id || 'new'}`}
    aria-labelledby={label}
    // prefetch={false}
    // shallow={true}
  >
    {label}
  </Link>
}
