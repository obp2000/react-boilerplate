import { useContext, useState } from 'react'
import type { DropdownProps } from 'react-widgets/cjs/DropdownList'
import type {
  DropdownListAttrs,
  GetRenderValue
} from '@/interfaces/dropdownList'
import { MainContext } from '@/services/context'
import { useMapFieldProps } from '@/options/hooks'
import { getRenderValue } from './helpers'
// import { fetcher } from '@/search/client'
// import useSWR from 'swr'
import { baseUrl } from '@/services/config'
import type { Dispatch, SetStateAction } from 'react'

const onSearch = (
  url: string | undefined,
  setData: Dispatch<SetStateAction<never[]>>,
  setBusy: Dispatch<SetStateAction<boolean>>
) => (term: string) => {
  if (typeof term === 'string' && term.length === 2) {
    setBusy(true)
    const searchParams = new URLSearchParams()
    searchParams.set('page_size', '1000000')
    searchParams.set('term', term)
    return fetch(`${baseUrl}${url}?${searchParams}`)
      .then(res => res.json()
        .then(({ results }) => {
          setData(results)
          setBusy(false)
        }))
  }
}

export const useSearch = (url: string) => {
  // const { data, error } = useSWR(url, fetcher)
  // console.log('data ', data)
  const [data, setData] = useState([])
  const [busy, setBusy] = useState(false)
  return {
    onSearch: onSearch(url, setData, setBusy),
    data,
    busy,
  }
}

const useWidgetMessages = () => {
  const { commonConsts } = useContext(MainContext)
  return {
    emptyFilter: commonConsts?.not_found,
    emptyList: () => commonConsts?.not_found,
  }
}

const useDropdownListTypeProps = (props: GetRenderValue) => {
  const renderValue = getRenderValue(props)
  return {
    filter: 'contains',
    renderValue,
    renderListItem: renderValue,
    messages: useWidgetMessages(),
  }
}

export const useFieldProps = ({
  input,
  meta,
  searchPath,
  renderValueComponent,
  autoComplete,
  ...props
}: DropdownListAttrs): DropdownProps<any> => {
  let {
    type: typeFromFieldProps,
    nestedOptions,
    helpText,
    ...result
  } = useMapFieldProps({ input, ...props })
  result = { type: typeFromFieldProps, ...result, ...input }
  result = {
    ...result,
    ...useDropdownListTypeProps({ renderValueComponent, nestedOptions }),
    ...useSearch(searchPath),
  }
  return {
    ...result,
    autoComplete,
    ...props,
  }
}
