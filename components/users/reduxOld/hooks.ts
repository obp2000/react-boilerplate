// import { useRouter } from 'next/dist/client/router'
import { useContext } from 'react'
import { MainContext } from '@/services/context'
import { useGetUserQuery } from './apiSlice'

export const useUser = () => {
  // const router = useRouter()
  // const { isFallback } = router
  const { options } = useContext(MainContext)
  const {
    data: object = {},
    isLoading: isLoadingUser,
  // } = useGetUserQuery(undefined, { skip: isFallback })
  } = useGetUserQuery(undefined)
  return {
    object,
    options,
    // loaded: !isLoadingUser && !isFallback,
    loaded: !isLoadingUser,
  }
}
