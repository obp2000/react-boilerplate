import type { Translation } from "@/app/i18n/dictionaries"
import type { Product } from '@/interfaces/products'

export function getDisplayName(
  choices: Translation['product']['threadsChoices'] |
    Translation['product']['contentsChoices'],
  formValue?: number | string | null
) {
  const value = parseInt(String(formValue))
  if (typeof value !== 'number') { return null }
  const currentChoice = choices.find((choice) => choice.value === value)
  return currentChoice?.display_name
}

export function getGetOptionLabel(labels: Translation['product']) {
  const threadsChoices = labels.threadsChoices
  const contentsChoices = labels.contentsChoices
  const fleeceLabel = labels.fleece.toLowerCase()
  return (product: Partial<Product> | null) => {
    if (!product) { return '' }
    const label = []
    label.push(product.productType?.name)
    label.push(getDisplayName(threadsChoices, product.threads))
    label.push(getDisplayName(contentsChoices, product.contents))
    if (product.fleece) {
      label.push(fleeceLabel)
    }
    label.push(product.name)
    return label.filter((name) => name !== null && name !== undefined).join(' ')
  }
}
