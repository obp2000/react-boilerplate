const array = require('lodash/array')

const emptyObject = {}

const isCalculatedFields = (fields = emptyObject, calculatedFields = []) =>
  // Object.keys(fields).every((field) => calculatedFields.includes(field))
  array.intersection(Object.keys(fields), calculatedFields) == fields

const disabled = ({
  submitting,
  pristine,
  hasSubmitErrors,
  hasValidationErrors,
  dirtySinceLastSubmit,
  dirtyFields,
  isLoading,
  calculatedFields,
}) => submitting ||
      pristine ||
      isCalculatedFields(dirtyFields, calculatedFields) ||
      hasValidationErrors ||
      isLoading ||
      (hasSubmitErrors && !dirtySinceLastSubmit)

export const useSubmitButton = ({
  text,
  className,
  commonConsts,
  ...rest
}) => {
  const label = text || commonConsts?.save
  return {
  	'type': 'submit',
    className,
    'aria-labelledby': label,
    'disabled': disabled(rest),
    'children': label,
  }
}
