import {invalid, valid} from './FieldStatus'

const emptyObject = {}

export const fieldProps = (
  {name} = emptyObject,
  options = emptyObject
) => options[name] || emptyObject

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
  } = fieldProps({name: name.split('.').pop()}, options)
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
