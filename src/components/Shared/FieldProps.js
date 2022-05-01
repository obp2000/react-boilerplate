import {invalid, valid} from './FieldStatus'

export const fieldProps = ({name} = {}, options = {}) => options[name] || {}

export const getFormText = (input, options, {help_text: helpText}) =>
  helpText || fieldProps(input, options).help_text

export const getFieldAttrs = ({
  name,
  type,
  onChange,
},
meta,
options,
) => {
  const {
    label,
    required,
    read_only: readOnly,
    choices,
    min_value: min,
    max_value: max,
  } = fieldProps({name}, options)
  const attrs = {
    name,
    'id': name,
    'placeholder': label,
    required,
    readOnly,
    'aria-label': label,
    choices,
  }
  if (meta) {
    attrs.invalid = invalid(meta)
    attrs.valid = valid(meta)
  }
  if (type == 'number') {
    attrs.min = min
    attrs.max = max
  }
  if (type == 'file') {
    attrs.accept = '.jpg, .png, .jpeg'
    attrs.onChange = ({
      target: {
        files,
      },
    }) => onChange(files[0])
  }
  return attrs
}
