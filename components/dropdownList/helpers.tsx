/* eslint-disable react/display-name */
import type { RenderValueProp } from 'react-widgets/cjs/DropdownListInput'
import type { GetRenderValue, SearchResult } from '@/interfaces/dropdownList'

export const getRenderValue = ({
  renderValueComponent: RenderValueComponent,
  nestedOptions,
}: GetRenderValue): RenderValueProp<SearchResult> =>
  ({ item }) => <RenderValueComponent object={item} options={nestedOptions} />
