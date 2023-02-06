import type { FormRenderProps } from 'react-final-form'

const hasDirtyAndVisitedFields = ({
  dirtyFields,
  visited
}: Pick<FormRenderProps, 'dirtyFields' | 'visited'>): boolean => {
  if (!visited || !dirtyFields) { return false }
  return Object.keys(dirtyFields).some((field) =>
    visited[field as keyof typeof visited] === true)
}

export function isDisabled({
  pristine,
  hasSubmitErrors,
  hasValidationErrors,
  dirtySinceLastSubmit,
  ...props
}: Pick<FormRenderProps, 'pristine' | 'hasSubmitErrors' |
  'hasValidationErrors' | 'dirtySinceLastSubmit' | 'dirtyFields' | 'visited'>) {
  return pristine ||
    !hasDirtyAndVisitedFields(props) ||
    hasValidationErrors ||
    (hasSubmitErrors && !dirtySinceLastSubmit)
}
