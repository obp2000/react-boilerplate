import {useRouter} from 'next/dist/client/router'
import {useGetUserQuery} from './apiSlice'
import {useOptionsOuery} from '../options/hooks'

const emptyObject = {}

export const indexUrl = '/user/'

export const userFieldNames = [
  'username',
  'email',
  'first_name',
  'last_name',
]

export const useUser = () => {
  const router = useRouter()
  const {isFallback} = router
  const {options, isFetchingOptions} = useOptionsOuery(indexUrl)
  const {
    data: object = emptyObject,
    isLoading: isLoadingUser,
  } = useGetUserQuery(undefined, {skip: isFallback})
  return {
    object,
    options,
    loaded: !isFetchingOptions && !isLoadingUser && !isFallback,
  }
}
