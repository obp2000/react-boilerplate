import type { FormRenderProps } from 'react-final-form'
import array from 'lodash/array'

type IsCalculatedFields = {
  fields?: { [index: string]: boolean }
  calculatedFields?: string[]
}

const isCalculatedFields = ({
  fields = {},
  calculatedFields = [] }: IsCalculatedFields = {}
): boolean =>
  array.intersection(Object.keys(fields), calculatedFields) == fields

type Props = FormRenderProps & {
  isLoading?: boolean
  calculatedFields?: string[]
}

export const disabled = ({
  submitting,
  pristine,
  hasSubmitErrors,
  hasValidationErrors,
  dirtySinceLastSubmit,
  dirtyFields,
  isLoading,
  calculatedFields, }: Props
): boolean => submitting ||
pristine ||
isCalculatedFields({ fields: dirtyFields, calculatedFields }) ||
hasValidationErrors ||
isLoading ||
  (hasSubmitErrors && !dirtySinceLastSubmit)
