import {useRouter} from 'next/dist/client/router'
import {useSelector} from 'react-redux'
import {selectAuth} from '../auth/selectors'
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

export const useUserForm = () => {
  const {isAuthenticated} = useSelector(selectAuth)
  const router = useRouter()
  const {isFallback} = router
  const {commonConsts, options, isFetchingOptions} = useOptionsOuery(indexUrl)
  const {
    data: user = emptyObject,
    isLoading: isLoadingUser,
  } = useGetUserQuery(undefined, {skip: isFallback})
  const tableData = userFieldNames.map((fieldName) => ({
    label: options[fieldName]?.label,
    value: user[fieldName],
  }))
  return {
    isFetchingOptions,
  	isLoadingUser,
    nameSingular: options?.name_singular,
    tableData,
    isAuthenticated,
  }
}
