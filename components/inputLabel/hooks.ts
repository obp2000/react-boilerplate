var object = require('lodash/fp/object')
import type { LabelAttrs, LabelSizes } from '@/interfaces/inputLabel'
import { useMapFieldProps } from '@/options/hooks'
import { FieldRenderProps } from 'react-final-form'

const inputLabelProps = ({ sm, size }: FieldRenderProps<any>): LabelSizes => ({
  sm,
  size: String(size),
})

export const useFieldProps = (props: FieldRenderProps<any>): LabelAttrs => ({
  ...useMapFieldProps({ isLabel: true, ...props }),
  ...inputLabelProps(props),
  ...object.pick(props, ['required', 'label', 'htmlFor']),
})


// export const getFieldProps2 = ({
//   name,
//   id,
//   required,
//   readOnly,
//   helpText,
//   placeholder,
//   min,
//   max,
//   step,
//   input,
//   meta,
//   options,
//   commonConsts,
//   searchPath,
//   dataKey,
//   textField,
//   renderValue,
//   size,
//   ...props
// }: FieldAttrs & SelectFieldAttrs & DropdownListAttrs): LabelProps => {
//   let result =
//     mapFieldProps({ name, input, options, isLabel: true, ...props })
//   return {
//     ...result,
//     size: String(size),
//     ...props as any,
//   }
// }

// export const inputLabelProps =
//   ({
//     // label,
//     sm,
//     size,
//   }: Partial<LabelAttrs>) => {
//     const result: Partial<LabelAttrs> = {
//       sm,
//       size,
//     }
//     // if (label) {
//     //  result.label = label
//     // }
//     return result
//   }
