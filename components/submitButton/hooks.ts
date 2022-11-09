import type { SubmitButtonProps } from '@/interfaces/objectForm'
import { useFormState } from 'react-final-form'

const useHasDirtyAndVisitedFields = (): boolean => {
  const { dirtyFields, visited = {} } = useFormState()
  return Object.keys(dirtyFields)
    .filter((field) => visited[field as keyof typeof visited])
    .length > 0
}

export const useDisabled = ({ isLoading }: SubmitButtonProps): boolean => {
  const {
    submitting,
    pristine,
    hasSubmitErrors,
    hasValidationErrors,
    dirtySinceLastSubmit,
  } = useFormState()
  const hasDirtyAndVisitedFields = useHasDirtyAndVisitedFields()
  return submitting ||
    pristine ||
    !hasDirtyAndVisitedFields ||
    hasValidationErrors ||
    isLoading ||
    (hasSubmitErrors && !dirtySinceLastSubmit)
}


// const useDirtyOnlyCalculatedFields = ({
//   calculatedFields
// }: SubmitButtonProps): boolean => {
//   const { dirtyFields, visited } = useFormState()
//   return array.intersection(Object.keys(dirtyFields), calculatedFields) ==
//     dirtyFields
// }

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
