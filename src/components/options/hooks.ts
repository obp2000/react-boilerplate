// import {useEffect, useLayoutEffect} from 'react'
import { useRouter } from 'next/dist/client/router'
import { useGetOptionsQuery } from './apiSlice'
import type { AnyOptionsAndCommonConsts } from '../../../interfaces'

export type OptionsOueryResult = AnyOptionsAndCommonConsts & {
  isLoadingOptions: boolean
  isFetchingOptions: boolean
}

export const useOptionsOuery = (url: string) => {
  const { isFallback } = useRouter()
  return useGetOptionsQuery(url, {
    skip: isFallback,
    selectFromResult: ({
      data,
      isLoading,
      isFetching,
    }): OptionsOueryResult => ({
      commonConsts: data?.commonConsts,
      options: data?.options,
      isLoadingOptions: isLoading || isFallback,
      isFetchingOptions: isFetching || isFallback,
    }),
  })
}



// const emptyObject = {}

// export const useOptionsTrigger = (url, optionsTrigger) => {
//     const router = useRouter()
//     const {isFallback} = router
//     useEffect(() => {
//         if (!isFallback) {
//             optionsTrigger(url, true)
//         }
//     }, [url, isFallback])
// }

// export const useOptions = (url) => getOptions.useQueryState(url, {
//     selectFromResult: ({
//         data: {
//             commonConsts,
//             options
//         } = emptyObject,
//         isLoading: isLoadingOptions,
//         isFetching: isFetchingOptions,
//         currentData: currentOptions,
//     }) => ({
//         commonConsts,
//         options,
//         isLoadingOptions,
//         isFetchingOptions,
//         currentOptions,
//     })
// })