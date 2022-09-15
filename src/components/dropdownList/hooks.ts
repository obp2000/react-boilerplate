import type { DropdownProps } from 'react-widgets/cjs/DropdownList'
import { useLazySearchObjectsQuery } from '../Search/apiSlice'
import { useInput } from '../formInput/hooks'
import type { FieldAttrs } from '../Shared/fieldProps'
import {
  CommonConsts,
  City,
  anyObject,
} from '../../../interfaces'

type SearchObjectsProps = {
  searchPath: string
  renderValue: () => JSX.Element
  commonConsts: CommonConsts
}

export type DropdownListAttrs = FieldAttrs & SearchObjectsProps

type DropdownListProps = DropdownProps<anyObject | City> & {
  helpText?: string
}

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
}: DropdownListAttrs): DropdownListProps => {
  const { onChange, ...inputProps } = useInput(props)
  return {
    ...useSearchObjects({ commonConsts, ...props }),
    ...inputProps,
  }
}
