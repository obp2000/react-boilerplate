import { AnyObject } from '@/interfaces/api'
import Link from 'next/link'
import { FC } from 'react'
import { useLinkToNewOrEditObject } from './hooks'

const LinkToNewOrEditObject: FC<AnyObject | {id: undefined}> = (object) => <Link
  className='btn btn-outline-primary btn-sm'
  {...useLinkToNewOrEditObject(object)}
/>

export default LinkToNewOrEditObject


  // const { commonConsts } = useContext(MainContext)
  // const label = object?.id ? commonConsts?.edit : commonConsts?.new
  // // const { pathname } = useRouter()
  // const pathname = usePathname()
  // const basePathname = pathname === '/'
  //   ? commonConsts?.main_menu[1].path
  //   : `${pathname}/`
  // const href = {
  //   pathname: `${basePathname}[id]`,
  //   query: { id: object?.id ?? 'new' }
  // }
  // return <Link
  //   href={href}
  //   aria-labelledby={label}
  //   className='btn btn-outline-primary btn-sm'>
  //   {label}
  // </Link>
