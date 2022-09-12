import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { useOptionsOuery } from '../options/hooks'
import { anyObject } from '../../../interfaces'

export type Props = {
  object?: anyObject
  indexUrl: string
}

const LinkToNewOrEditObject = ({ object, indexUrl }: Props): JSX.Element => {
  const { commonConsts } = useOptionsOuery(indexUrl)
  const label = object?.id ? commonConsts?.edit : commonConsts?.new
  const {pathname} = useRouter()
  const href = {
    pathname: pathname === '/' ? '/customers/[id]' : `${pathname}/[id]`,
    query: {id: object?.id ?? 'new'}
  }
  return <Link href={href} aria-labelledby={label} shallow={true}>
    <a className="btn btn-outline-primary btn-sm">
      {label}
    </a>
  </Link>
}

export default LinkToNewOrEditObject
