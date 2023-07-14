import contentsChoices from './contents.json'
import threadsChoices from './threads.json'
import { Prisma } from "@prisma/client"
import tables from '@/app/_tables/tables.json'

import type { Translation } from "@/app/i18n/dictionaries"
import type { Product } from '@/interfaces/products'

function getDisplayName(
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

export function getGetProductFullName({
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

function where(term?: string | null) {
  if (!term) { return {} }
  const containsTerm = { contains: term }
  return {
    OR: [
      { name: containsTerm },
      { productType: { name: containsTerm } },
    ]
  }
}

export function findManyArgs(term?: string | null) {
  return {
    where: where(term),
    select: tables.products.select.objects,
    orderBy: [
      {
        updatedAt: 'desc' as Prisma.SortOrder,
      },
    ],
  }
}
