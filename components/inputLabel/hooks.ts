import { useMapFieldProps } from '@/options/hooks'
import { FieldRenderProps } from 'react-final-form'

const inputLabelProps = ({ sm, size }: FieldRenderProps<any>) => ({
  sm,
  size: String(size),
})

export function useFieldProps(
  props: FieldRenderProps<any>): Omit<FieldRenderProps<any>, 'input' | 'meta'> {
  const { size, ...result } = useMapFieldProps({ isLabel: true, ...props })
  let ownProps: Omit<FieldRenderProps<any>, 'input' | 'meta'> = {}
  if (props.required) {
    ownProps.required = props.required
  }
  if (props.label) {
    ownProps.label = props.label
  }
  if (props.htmlFor) {
    ownProps.htmlFor = props.htmlFor
  }
  return {
    ...result,
    ...inputLabelProps(props),
    ...ownProps,
  }
}
