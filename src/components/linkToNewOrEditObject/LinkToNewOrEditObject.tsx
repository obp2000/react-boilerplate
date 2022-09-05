import Link from 'next/link'
import {useOptionsOuery} from '../options/hooks'
import {
  Customer,
  Product,
  Order,
} from '../../../interfaces'

export type Props = {
  object?: Customer & Product & Order
  indexUrl: string
}

export default ({object, indexUrl}: Props): JSX.Element => {
  const {commonConsts} = useOptionsOuery(indexUrl)
  const label = object?.id ? commonConsts?.edit : commonConsts?.new
  const pathname = `${indexUrl}${object?.id ?? 'new'}`
  const href = {pathname}
  return 	<Link href={href} aria-labelledby={label} shallow={true}>
    <a className="btn btn-outline-primary btn-sm">
      {label}
    </a>
  </Link>
}
