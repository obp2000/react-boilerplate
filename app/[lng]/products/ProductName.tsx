import { Translation } from '@/app/i18n/dictionaries'
import type { Product } from '@/app/[lng]/products/helpers'

export function getDisplayName(
  choices: Translation['product']['threadsChoices'] |
    Translation['product']['contentsChoices'],
  value: number) {
  // if (!value) { return null }
  const currentChoice = choices.find((choice) => choice.value === value)
  return currentChoice ? currentChoice.display_name : ''
}

export default function ProductName({
  object,
  labels
}: {
  object: Product
  labels: Translation['product']
}) {
  return <>
    {object?.productType && `${object.productType.name} `}
    {object?.threads !== null &&
      `${getDisplayName(labels.threadsChoices, object.threads as number)} `}
    {object?.contents !== null &&
      `${getDisplayName(labels.contentsChoices, object.contents as number)} `}
    {object?.fleece && `${labels.fleece.toLowerCase()} `}
    {object?.name}
  </>
}
