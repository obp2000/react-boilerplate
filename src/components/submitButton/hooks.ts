import type { FormRenderProps } from 'react-final-form'
import array from 'lodash/array'

type Props = FormRenderProps & {
  isLoading?: boolean
  calculatedFields?: string[]
}

const emptyObject = {}
const emptyArray: any[] = []

const isCalculatedFields = ({
  fields = emptyObject,
  calculatedFields = emptyArray }:
  { fields?: {}; calculatedFields?: any[] } = emptyObject
): boolean => array.intersection(Object.keys(fields), calculatedFields) == fields

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
