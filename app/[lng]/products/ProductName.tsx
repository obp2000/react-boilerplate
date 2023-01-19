import options from './[id]/options.json'
import type { ProductsSelect } from '@/interfaces/api'

export function getDisplayName(
  choices: typeof options['threads']['choices'] | typeof options['contents']['choices'],
  value: number) {
  // if (!value) { return null }
  const currentChoice = choices.find((choice) => choice.value === value)
  return currentChoice ? currentChoice.display_name : ''
}

export default function ProductName({ object }: { object: ProductsSelect }) {
  return <>
    {object?.productType && `${object.productType.name} `}
    {object?.threads !== null &&
      `${getDisplayName(options.threads.choices, object.threads)} `}
    {object?.contents !== null &&
      `${getDisplayName(options.contents.choices, object.contents)} `}
    {object?.fleece && `${options.fleece.label.toLowerCase()} `}
    {object?.name}
  </>
}
