import { FC } from 'react'
import type {
  SelectFieldAttrs,
  SelectOptions
} from '../../interfaces/selectField'
import { useMapFieldProps } from '../options/hooks'

const SelectOptionsComp: FC<SelectFieldAttrs> = (props) => {
  const { selectOptions } = useMapFieldProps(props)
  return <>
    {selectOptions?.map(({ value, label }: SelectOptions, key: number) =>
      <option key={key} {...{ value }}>{label}</option>
    )}
  </>
}

export default SelectOptionsComp
