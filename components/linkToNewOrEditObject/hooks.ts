import { AnyObject } from '@/interfaces/api'
import { MainContext } from '@/services/context'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'

export const useLinkToNewOrEditObject = (object: AnyObject | {id: undefined}) => {
	const { commonConsts } = useContext(MainContext)
  const label = object?.id ? commonConsts?.edit : commonConsts?.new
  // const { pathname } = useRouter()
  const pathname = usePathname()
  const basePathname = pathname === '/'
    ? commonConsts?.main_menu[1].path
    : `${pathname}/`
  const href = {
    pathname: `${basePathname}[id]`,
    query: { id: object?.id ?? 'new' }
  }
  return {
  	href,
    'aria-labelledby': label,
    children: label,
  }
}
