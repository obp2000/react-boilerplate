const emptyObject = {}

const invalid = ({visited, error}) => (visited && !!error ? true : null)

const valid = ({visited, error}) => (visited && !error ? true : null)

export const useFieldProps = ({
  input = emptyObject,
  name = input.name,
  options = emptyObject,
}) => options[name.split('.').pop()] || emptyObject

export const useFormText = (props) => {
  const helpText = useFieldProps(props).help_text
  return props.helpText || helpText
}

export const useFieldAttrs = ({
  input = emptyObject,
  name = input.name,
  meta = emptyObject,
  options,
}) => {
  const {
    label,
    required,
    read_only: readOnly,
    choices,
    min_value: min,
    max_value: max,
  } = useFieldProps({input: {name}, options})
  const attrs = {
    name,
    'id': name,
    'placeholder': label,
    required,
    readOnly,
    'aria-label': label,
    choices,
  }
  if ([undefined,
    'text',
    'number',
    'password',
    'email',
  ].includes(input.type)) {
    // console.log('meta ', name, meta)
    attrs.invalid = invalid(meta)
    attrs.valid = valid(meta)
  }
  if (input.type === 'number') {
    attrs.min = min
    attrs.max = max
  }
  if (input.type === 'file') {
    attrs.accept = '.jpg, .png, .jpeg'
    attrs.onChange = ({
      target: {
        files,
      },
    }) => input.onChange(files[0])
  }
  return attrs
}

export const useFieldLabel = (props) => {
  const {label, required = props.required} = useFieldProps(props)
  return {
    label,
    required,
    htmlFor: props.name || props.input.name,
    sm: props.labelColSize,
    size: props.labelSize,
    check: props.check,
  }
}

export const useInput = (props) => {
  const {input, meta, options, searchPath, ...rest} = props
  if (input.type === 'file') {
    delete input.value
  }
  return {
    ...input,
    ...useFieldAttrs(props),
    ...rest,
  }
}

export const useSelectField = (props) => {
  const {choices, ...fieldAttrs} = useFieldAttrs(props)
  const {options, dataKey, textField, ...rest} = props
  const selectOptions = choices?.map(
      ({[dataKey]: value, [textField]: label}) => ({value: value ?? '', label}))
  return {
    fieldAttrs: {...fieldAttrs, ...rest},
    selectOptions,
  }
}
