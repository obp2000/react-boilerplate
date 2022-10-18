import React from 'react'
import { useMapFieldProps } from '../options/hooks'
import type {
  SelectFieldAttrs,
  SelectOptions
} from '../../../interfaces/selectField'

const SelectOptionsComp = (props: SelectFieldAttrs) => {
  const { selectOptions } = useMapFieldProps(props)
  return <>
    {selectOptions?.map(({ value, label }: SelectOptions, key: number) =>
      <option key={key} {...{ value }}>{label}</option>
    )}
  </>
}

export default SelectOptionsComp
