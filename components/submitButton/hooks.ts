import type { Values as CustomerValues } from '@/app/[lng]/customers/[id]/calculator'
import type { Values as OrderValues } from '@/app/[lng]/orders/[id]/calculator'
import type { Values as ProductValues } from '@/app/[lng]/products/[id]/calculator'
import type { Values as UserValues } from '@/auth/AuthButtonAndModal'
import type { FormRenderProps } from 'react-final-form'

const useHasDirtyAndVisitedFields = ({
  dirtyFields,
  visited
}: Pick<FormRenderProps, 'dirtyFields' | 'visited'>): boolean => {
  // const { dirtyFields, visited = {} } = useFormState()
  if (!visited || !dirtyFields) { return false }
  return Object.keys(dirtyFields).some((field) =>
    visited[field as keyof typeof visited] === true)
  // .length > 0
}

export function useDisabled({
  submitting,
  pristine,
  hasSubmitErrors,
  hasValidationErrors,
  dirtySinceLastSubmit,
  ...props
}: FormRenderProps<CustomerValues> | FormRenderProps<ProductValues> |
  FormRenderProps<OrderValues> | FormRenderProps<UserValues>) {
  // const {
  //   submitting,
  //   pristine,
  //   hasSubmitErrors,
  //   hasValidationErrors,
  //   dirtySinceLastSubmit,
  // } = useFormState()
  const hasDirtyAndVisitedFields = useHasDirtyAndVisitedFields(props)
  // console.log('hasDirtyAndVisitedFields ', hasDirtyAndVisitedFields)
  return submitting ||
    pristine ||
    !hasDirtyAndVisitedFields ||
    hasValidationErrors ||
    (hasSubmitErrors && !dirtySinceLastSubmit)
}


// type SubmitButtonProps = {
//   label?: string
//   className?: string
//   isLoading?: boolean
// }


// export const useDisabled = ({ isLoading }: SubmitButtonProps): boolean => {
//   const {
//     submitting,
//     pristine,
//     hasSubmitErrors,
//     hasValidationErrors,
//     dirtySinceLastSubmit,
//   } = useFormState()
//   const hasDirtyAndVisitedFields = useHasDirtyAndVisitedFields()
//   return submitting ||
//     pristine ||
//     !hasDirtyAndVisitedFields ||
//     hasValidationErrors ||
//     isLoading ||
//     (hasSubmitErrors && !dirtySinceLastSubmit)
// }

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
