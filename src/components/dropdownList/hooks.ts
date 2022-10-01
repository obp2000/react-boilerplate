import type { DropdownProps } from 'react-widgets/cjs/DropdownList'
import { useLazySearchObjectsQuery } from '../Search/apiSlice'
import { useInput } from '../formInput/hooks'
import type {
  City,
  AnyObject,
  DropdownListAttrs,
} from '../../../interfaces'

type DropdownListProps = DropdownProps<AnyObject | City> & {
  helpText?: string
}

const widgetMessages = (notFound: string | undefined) => ({
  emptyFilter: notFound,
  emptyList: () => notFound,
})

export const useDropdownList =
  ({ textField,
    dataKey,
    searchPath,
    renderValue,
    commonConsts,
    ...props
  }: DropdownListAttrs): DropdownListProps => {
    const {
      name,
      id,
      readOnly,
      placeholder,
      value,
      onChange,
      ...inputProps
    } = useInput(props)
    const [searchTrigger, { data, isFetching }] = useLazySearchObjectsQuery()
    const onSearch = (term: string) => {
      if (term.length === 2) {
        searchTrigger({ url: searchPath, params: { term } }, true)
      }
    }
    return {
      name,
      id,
      readOnly,
      placeholder,
      'aria-label': inputProps['aria-label'],
      value,
      onChange,
      textField,
      dataKey,
      data,
      onSearch,
      busy: isFetching,
      renderListItem: renderValue,
      messages: widgetMessages(commonConsts?.not_found),
      renderValue,
    }
  }
