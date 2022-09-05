// import {useEffect, useLayoutEffect} from 'react'
import {useRouter} from 'next/dist/client/router'
import {useGetOptionsQuery} from './apiSlice'
import type {OptionsAndCommonConsts} from './apiSlice'

export type OptionsOueryResult = OptionsAndCommonConsts & {
  isLoadingOptions: boolean
  isFetchingOptions: boolean
}

export const useOptionsOuery = (url: string) => {
  const router = useRouter()
  // console.log('useOptionsOuery...........', url)
  const {isFallback} = router
  return useGetOptionsQuery(url, {
    skip: isFallback,
    selectFromResult: ({
      data,
      isLoading,
      isFetching,
      // currentData: currentOptions,
    }): OptionsOueryResult => ({
      commonConsts: data?.commonConsts,
      options: data?.options,
      isLoadingOptions: isLoading || isFallback,
      isFetchingOptions: isFetching || isFallback,
      // currentOptions,
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