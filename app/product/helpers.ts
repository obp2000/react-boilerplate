import type { Translation } from "@/app/i18n/dictionaries"
import type { Product } from '@/interfaces/products'
import contentsChoices from './contents.json'
import threadsChoices from './threads.json'

export function getDisplayName(
  choices: typeof threadsChoices | typeof contentsChoices,
  labels: Translation['product']['threadsLabels'] |
    Translation['product']['contentsLabels'],
  formValue?: number | string | null
) {
  const value = parseInt(String(formValue))
  if (typeof value !== 'number') { return null }
  const currentChoice = choices.find(({ id }) => id === value)
  return labels[currentChoice?.name as keyof typeof labels]
}

export function getGetOptionLabel({
  threadsLabels,
  contentsLabels,
  fleece
}: Translation['product']) {
  return (product: Partial<Product> | null) => {
    if (!product) { return '' }
    const label = []
    label.push(product.productType?.name)
    label.push(getDisplayName(threadsChoices, threadsLabels, product.threads))
    label.push(getDisplayName(contentsChoices, contentsLabels, product.contents))
    if (product.fleece) {
      label.push(fleece.toLowerCase())
    }
    label.push(product.name)
    return label.filter((name) => name !== null && name !== undefined).join(' ')
  }
}
