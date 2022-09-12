import {useAppSelector} from '../hooks'
import {selectAuth} from '../auth/selectors'
import {useOptionsOuery} from '../options/hooks'

type Props = {
  indexUrl: string
}

export const useLayout = ({indexUrl}: Props) => {
  const {isAuthenticated} = useAppSelector(selectAuth)
  return {
  	isAuthenticated,
  	...useOptionsOuery(indexUrl),
  }
}



// export const baseSegment = () => {
//   const router = useRouter()
//   const {asPath} = router
//   const segment = asPath.split('/')[1]
//   return `/${segment || 'customers'}/`
// }
