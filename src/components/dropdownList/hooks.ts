import { useContext } from 'react'
import type { DropdownProps } from 'react-widgets/cjs/DropdownList'
import type {
  DropdownListAttrs,
  GetRenderValue
} from '../../../interfaces/dropdownList'
import { OptionsContext } from '../layout/Layout'
import { useMapFieldProps } from '../options/hooks'
import { useLazySearchObjectsQuery } from '../Search/apiSlice'
import { getRenderValue } from './helpers'

export const useSearch = (url: string) => {
  const [searchTrigger, { data, isFetching }] = useLazySearchObjectsQuery()
  const onSearch = (term: string) => {
    if (term.length === 2) {
      searchTrigger({ url, params: { term } }, true)
    }
  }
  return {
    onSearch,
    data,
    busy: isFetching
  }
}

const useWidgetMessages = () => {
  const { commonConsts } = useContext(OptionsContext)
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
