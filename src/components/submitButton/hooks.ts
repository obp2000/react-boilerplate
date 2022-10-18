import array from 'lodash/array'
import { useFormState } from 'react-final-form'
import type { SubmitButtonProps } from '../../../interfaces/objectForm'

const useDirtyOnlyCalculatedFields = ({
  calculatedFields
}: SubmitButtonProps): boolean => {
  const { dirtyFields } = useFormState()
  return array.intersection(Object.keys(dirtyFields), calculatedFields) ==
    dirtyFields
}

export const useDisabled = ({
  isLoading,
  ...props
}: SubmitButtonProps): boolean => {
  const {
    submitting,
    pristine,
    hasSubmitErrors,
    hasValidationErrors,
    dirtySinceLastSubmit,
  } = useFormState()
  // console.log('rest useForm ', useForm())
  const dirtyOnlyCalculatedFields = useDirtyOnlyCalculatedFields(props)
  return submitting ||
    pristine ||
    dirtyOnlyCalculatedFields ||
    hasValidationErrors ||
    isLoading ||
    (hasSubmitErrors && !dirtySinceLastSubmit)
}


// export const disabled = ({
//   submitting,
//   pristine,
//   hasSubmitErrors,
//   hasValidationErrors,
//   dirtySinceLastSubmit,
//   dirtyFields,
//   isLoading,
//   calculatedFields, }: SubmitButtonProps
// ): boolean => submitting ||
// pristine ||
// isCalculatedFields({ fields: dirtyFields, calculatedFields }) ||
// hasValidationErrors ||
// isLoading ||
//   (hasSubmitErrors && !dirtySinceLastSubmit)
