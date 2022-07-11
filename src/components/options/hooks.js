import {useEffect, useLayoutEffect} from 'react'
import {useOutletContext} from 'react-router-dom'
import {getOptions} from './optionsApi'

export const useOptionsTrigger = (url) => {
    const {optionsTrigger} = useOutletContext()
    useLayoutEffect(() => {
        optionsTrigger(url, true)
        console.log('options trigger ', url)
    }, [url])
}

const emptyObject = {}

export const useOptions = (url) => getOptions.useQueryState(url, {
    selectFromResult: ({
        data: {
            commonConsts,
            options
        } = emptyObject,
        isFetching
    }) => ({
        commonConsts,
        options,
        isFetching
    })
})