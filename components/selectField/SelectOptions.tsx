import { useMapFieldProps } from '@/options/hooks'
import { FieldRenderProps } from 'react-final-form'

export default function SelectOptionsComp(
  props: Omit<FieldRenderProps<any>, 'input' | 'meta'>) {
  const { selectOptions } = useMapFieldProps(props)
  return <>
    {selectOptions?.map(
      ({
        value,
        label
      }: { value: number, label: string }, key: number) =>
        <option key={key} {...{ value }}>{label}</option>
    )}
  </>
}
