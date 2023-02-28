import type { FormState } from 'react-hook-form'

// const hasDirtyAndTouchedFields = ({
//   dirtyFields,
//   touchedFields
// }: Partial<FormState<any>>): boolean => {
//   if (!touchedFields || !dirtyFields) { return false }
//   return Object.keys(dirtyFields).some((field) => field in touchedFields)
// }

export function isDisabled({
  isDirty,
  isValid,
  dirtyFields,
  touchedFields,
  ...props
}: Partial<FormState<any>>) {
  console.log('dirtyFields ', dirtyFields)
  return !isDirty ||
    !isValid ||
    !Object.keys(dirtyFields || {}).some((field) => field in (touchedFields || {}))
  // return !isDirty
}
