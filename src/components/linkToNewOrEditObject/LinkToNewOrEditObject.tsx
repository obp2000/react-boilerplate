import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useContext } from 'react'
import type { AnyObjectType } from '../../../interfaces/api'
import { OptionsContext } from '../layout/Layout'

const LinkToNewOrEditObject = ({ object }: AnyObjectType): JSX.Element => {
  const { commonConsts } = useContext(OptionsContext)
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
