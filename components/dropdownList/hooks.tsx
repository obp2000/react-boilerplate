import type { DropdownFieldRenderProps, TDataItem } from '@/interfaces/dropdownList'
import { baseUrl } from '@/services/config'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

function onSearch(
  searchPath: string | undefined,
  setData: Dispatch<SetStateAction<never[]>>,
  setBusy: Dispatch<SetStateAction<boolean>>
) {
  return (term: string) => {
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
}

export function useFieldProps({
  input,
  meta,
  searchPath,
  renderValueComponent: RenderValueComponent,
  labels,
  ...props
}: DropdownFieldRenderProps): Omit<DropdownFieldRenderProps, 'input' | 'meta'> {
  const renderValue = ({ item }: { item: TDataItem }) =>
    <RenderValueComponent object={item} {...{ labels }} />
  const [data, setData] = useState([])
  const [busy, setBusy] = useState(false)
  let result = {
    ...input,
    filter: 'contains',
    renderValue,
    renderListItem: renderValue,
    onSearch: onSearch(searchPath, setData, setBusy),
    data,
    busy,
    ...props
  }
  return result
}
