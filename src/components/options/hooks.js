// import {useEffect, useLayoutEffect} from 'react'
import {useRouter} from 'next/dist/client/router'
import {getOptions, useGetOptionsQuery} from './apiSlice'

const emptyObject = {}

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

export const useOptionsOuery = (url) => {
  const router = useRouter()
  const {isFallback} = router
  return useGetOptionsQuery(url, {
    skip: isFallback,
    selectFromResult: ({
      data: {
        commonConsts,
        options,
      } = emptyObject,
      isLoading: isLoadingOptions,
      isFetching: isFetchingOptions,
      // currentData: currentOptions,
    }) => ({
      commonConsts,
      options,
      isLoadingOptions,
      isFetchingOptions,
      // currentOptions,
    }),
  })
}
