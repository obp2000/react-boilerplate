// import { useTranslation } from '@/app/i18n/client'
import { useMapFieldProps } from '@/options/hooks'
import { baseUrl } from '@/services/config'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { FieldRenderProps } from 'react-final-form'
import type { DropdownProps } from 'react-widgets/cjs/DropdownList'
import { getRenderValue } from './helpers'

const onSearch = (
  searchPath: string | undefined,
  setData: Dispatch<SetStateAction<never[]>>,
  setBusy: Dispatch<SetStateAction<boolean>>
) => (term: string) => {
  if (typeof term === 'string' && term.length === 2) {
    setBusy(true)
    const searchParams = new URLSearchParams()
    searchParams.set('term', term)
    return fetch(`${baseUrl}${searchPath}?${searchParams}`)
      .then(res => res.json()
        .then((results) => {
          // console.log('results ', results)
          setData(results)
          setBusy(false)
        }))
  }
}

export const useSearch = ({ searchPath }: { searchPath: string }) => {
  // const { data, error } = useSWR(url, fetcher)
  // console.log('data ', data)
  const [data, setData] = useState([])
  const [busy, setBusy] = useState(false)
  return {
    onSearch: onSearch(searchPath, setData, setBusy),
    data,
    busy,
  }
}

const useDropdownListTypeProps = (
  props: Omit<FieldRenderProps<any>, 'input' | 'meta'> & DropdownProps<any>) => {
  const renderValue = getRenderValue(props)
  return {
    filter: 'contains',
    renderValue,
    renderListItem: renderValue,
    // messages: useWidgetMessages({ labels: props?.labels, lng: props?.lng }),
  }
}

export const useFieldProps = ({
  input,
  meta,
  searchPath,
  autoComplete,
  renderValueComponent,
  ...props
}: FieldRenderProps<any> & DropdownProps<any>): DropdownProps<any> => {
  let {
    type: typeFromFieldProps,
    helpText,
    ...result
  } = useMapFieldProps({ input, ...props })
  result = { type: typeFromFieldProps, ...result, ...input }
  result = {
    ...result,
    ...useDropdownListTypeProps({ renderValueComponent, ...props }),
    ...useSearch({ searchPath }),
  }
  return {
    ...result,
    autoComplete,
    ...props,
  }
}


// const useWidgetMessages = ({ labels, lng }: { labels: Record<string, string>, lng: string }) => {
//   const { t } = useTranslation(lng)
//   const notFound = t('not_found')
//   return {
//     emptyFilter: notFound,
//     emptyList: () => notFound,
//   }
// }
