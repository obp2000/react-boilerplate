import { useRouter } from 'next/dist/client/router'
import { useOptionsOuery } from '../options/hooks'
import { useGetUserQuery } from './apiSlice'
import { url as indexUrl } from './apiSlice'

export const useUser = () => {
  const router = useRouter()
  const { isFallback } = router
  const { options, isFetchingOptions } = useOptionsOuery(indexUrl)
  const {
    data: object = {},
    isLoading: isLoadingUser,
  } = useGetUserQuery(undefined, { skip: isFallback })
  return {
    object,
    options,
    loaded: !isFetchingOptions && !isLoadingUser && !isFallback,
  }
}
