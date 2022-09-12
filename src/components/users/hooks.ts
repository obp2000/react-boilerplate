import { useRouter } from 'next/dist/client/router'
import { useGetUserQuery } from './apiSlice'
import { useOptionsOuery } from '../options/hooks'
import { User } from '../../../interfaces'

const initUser: User = {
  pk: undefined,
  username: undefined,
  email: undefined,
  first_name: undefined,
  last_name: undefined,
}

export const indexUrl = '/user/'

export const userFieldNames = [
  'username',
  'email',
  'first_name',
  'last_name',
]

export const useUser = () => {
  const router = useRouter()
  const { isFallback } = router
  const { options, isFetchingOptions } = useOptionsOuery(indexUrl)
  const {
    data: object = initUser,
    isLoading: isLoadingUser,
  } = useGetUserQuery(undefined, { skip: isFallback })
  return {
    object,
    options,
    loaded: !isFetchingOptions && !isLoadingUser && !isFallback,
  }
}
