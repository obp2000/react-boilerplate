import {useOutletContext} from 'react-router-dom'
import {useGetUserQuery} from './apiSlice'
import {useOptionsTrigger} from '../options/hooks'

const emptyObject = {}

export const userFieldNames = [
  'username',
  'email',
  'first_name',
  'last_name',
]

export const useUserForm = () => {
  const {
    options = emptyObject,
    options: {
      name_singular: nameSingular,
    } = emptyObject,
    isFetchingOptions,
  } = useOutletContext()
  // console.log('options ', options)
  // console.log('currentOptions ', currentOptions)
  const indexUrl = '/user/'
  useOptionsTrigger(indexUrl)
  const {
    data: user = emptyObject,
    isLoading: isLoadingUser,
  } = useGetUserQuery()
  const tableData = userFieldNames.map((fieldName) => ({
    label: options[fieldName]?.label,
    value: user[fieldName],
  }))
  return {
    isFetchingOptions,
  	isLoadingUser,
    nameSingular,
    tableData,
  }
}
