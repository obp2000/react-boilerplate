import { useLazySearchObjectsQuery } from '../Search/apiSlice'
import { useInput } from '../Shared/FieldProps'
import type { FieldAttrs } from '../Shared/FieldProps'
import { CommonConsts } from '../../../interfaces'

type SearchObjectsProps = {
  searchPath: string
  renderValue: () => JSX.Element
  commonConsts: CommonConsts
}

export type DropdownListProps = FieldAttrs & SearchObjectsProps

const widgetMessages = (notFound: string) => ({
  emptyFilter: notFound,
  emptyList: () => notFound,
})

export const useSearchObjects = ({
  searchPath,
  renderValue,
  commonConsts,
}: SearchObjectsProps) => {
  const [searchTrigger, { data, isFetching }] = useLazySearchObjectsQuery()
  const onSearch = (term: string) => {
    if (term.length === 2) {
      searchTrigger({ url: searchPath, params: { term } }, true)
    }
  }
  return {
    data,
    onSearch,
    busy: isFetching,
    renderListItem: renderValue,
    messages: widgetMessages(commonConsts?.not_found),
  }
}

export const useDropdownList = ({
  commonConsts,
  ...props
}: DropdownListProps) => ({
  ...useSearchObjects({ commonConsts, ...props }),
  ...useInput(props),
})
