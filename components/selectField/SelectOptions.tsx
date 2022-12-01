import type { SelectFieldAttrs, SelectOptions } from '@/interfaces/selectField'
import { useMapFieldProps } from '@/options/hooks'

export default function SelectOptionsComp(props: SelectFieldAttrs) {
  const { selectOptions } = useMapFieldProps(props)
  return <>
    {selectOptions?.map(({ value, label }: SelectOptions, key: number) =>
      <option key={key} {...{ value }}>{label}</option>
    )}
  </>
}
