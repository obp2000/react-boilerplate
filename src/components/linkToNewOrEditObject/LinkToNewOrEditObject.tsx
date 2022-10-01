import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import type { AnyObject, CommonConstsType } from '../../../interfaces'

export type Props = CommonConstsType & {
  object?: AnyObject
}

const LinkToNewOrEditObject = ({
  object, commonConsts
}: Props): JSX.Element => {
  const label = object?.id ? commonConsts?.edit : commonConsts?.new
  const { pathname } = useRouter()
  const basePathname = pathname === '/'
    ? commonConsts?.main_menu[1].path
    : `${pathname}/`
  const href = {
    pathname: `${basePathname}[id]`,
    query: { id: object?.id ?? 'new' }
  }
  return <Link href={href} aria-labelledby={label}>
    <a className="btn btn-outline-primary btn-sm">
      {label}
    </a>
  </Link>
}

export default LinkToNewOrEditObject
