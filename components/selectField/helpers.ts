import { SelectFieldRenderProps } from "@/interfaces/selectField"

export function mapChoices({
  choices = [],
  dataKey,
  textField
}: SelectFieldRenderProps) {
  const blankChoice = { [dataKey]: '', [textField]: '------' }
  return [blankChoice, ...choices].map(({
    [dataKey]: value, [textField]: label }) => ({ value: value ?? '', label }))
}
