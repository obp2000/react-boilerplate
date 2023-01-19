import { useMapFieldProps } from '@/options/hooks'
import type { FieldProps, FieldRenderProps } from 'react-final-form'

export function mapChoices({
  choices = [],
  dataKey,
  textField
}: Omit<FieldRenderProps<any>, 'input' | 'meta'>) {
  const blankChoice = { [dataKey]: '', [textField]: '------' }
  return [blankChoice, ...choices].map(({
    [dataKey]: value, [textField]: label }) => ({ value: value ?? '', label }))
}

export const useFieldProps = ({
  dataKey,
  textField,
  name,
  ...props
}: Omit<FieldRenderProps<any>, 'input' | 'meta'>): FieldProps<any, any> => {
  let {
    selectOptions,
    helpText,
    ...result
  } = useMapFieldProps({ dataKey, textField, name: String(name), ...props })
  // console.log('selectOptions ', selectOptions)
  return {
    name: String(name),
    ...result,
    ...props,
  }
}

// export function mapChoices(props: Omit<FieldRenderProps<any>, 'input' | 'meta'> &
//   Pick<typeof productOptions['product_type_id'], 'choices'>): SelectOptions[]
// export function mapChoices(props: Omit<FieldRenderProps<any>, 'input' | 'meta'> &
//   Pick<typeof productOptions['threads'], 'choices'>): SelectOptions[]
// export function mapChoices(props: Omit<FieldRenderProps<any>, 'input' | 'meta'> &
//   Pick<typeof productOptions['contents'], 'choices'>): SelectOptions[]
// export function mapChoices(props: Omit<FieldRenderProps<any>, 'input' | 'meta'> &
//   Pick<typeof orderOptions['packet'], 'choices'>): SelectOptions[]
// export function mapChoices(props: Omit<FieldRenderProps<any>, 'input' | 'meta'> &
//   Pick<typeof orderOptions['delivery_type'], 'choices'>): SelectOptions[]
