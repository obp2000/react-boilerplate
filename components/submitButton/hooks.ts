// import array from 'lodash/array'
import { useFormState } from 'react-final-form'
import type { SubmitButtonProps } from '../../interfaces/objectForm'

const useHasDirtyAndVisitedFields = (): boolean => {
  const { dirtyFields, visited = {} } = useFormState()
  const result = Object.keys(dirtyFields).reduce(
    (dirtyAndVisited: string[], field) => {
      if (visited[field as keyof typeof visited]) {
        dirtyAndVisited.push(field)
      }
      return dirtyAndVisited
    }, [])
  return result.length > 0
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
