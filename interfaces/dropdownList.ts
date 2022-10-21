import type { DropdownProps } from 'react-widgets/cjs/DropdownList'
// import type { TextAccessor } from 'react-widgets/cjs/Accessors'
import type { FieldAttrs } from './input'
// import type { CommonConstsType } from './commonConsts'
import type { AnyObject } from './api'
import type { City, CityOptions } from './cities'
import type { CustomerOptions } from './customers'
import type { ProductOptions } from './products'

export type DropdownListAttrs = FieldAttrs & DropdownProps<any> & {
  searchPath: string
}

export type SearchResult = City | AnyObject

export type NestedOptions = CityOptions | CustomerOptions | ProductOptions

export type RenderValueComponentType =
  ({ object, options }: { object: SearchResult, options: NestedOptions }) =>
    JSX.Element

export type GetRenderValue = {
  renderValueComponent: RenderValueComponentType
  nestedOptions: NestedOptions
}

// export type DropdownListProps = DropdownProps<SearchResult> & {
//   required?: boolean
//   helpText?: string
// }

