import {useEffect, useLayoutEffect} from 'react'
import {useOutletContext} from 'react-router-dom'
import {getOptions} from './optionsApi'

const emptyObject = {}

export const useOptionsTrigger = (url) => {
    const {optionsTrigger} = useOutletContext()
    useLayoutEffect(() => {
        optionsTrigger(url, true)
        // console.log('options trigger ', url)
    }, [url])
}

export const useOptions = (url) => getOptions.useQueryState(url, {
    selectFromResult: ({
        data: {
            commonConsts,
            options
        } = emptyObject,
        isLoading: isLoadingOptions,
        isFetching: isFetchingOptions,
        currentData: currentOptions,
    }) => ({
        commonConsts,
        options,
        isLoadingOptions,
        isFetchingOptions,
        currentOptions,
    })
})