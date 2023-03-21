import 'server-only'

import type { Translation } from '@/app/i18n/dictionaries'

export function labels({
  add,
  delete: textDelete,
  not_found: notFound,
  count,
  order: labels,
  yes: okText,
  no: cancelText,
  customer: customerLabels,
  product: productLabels,
}: Translation) {
  return {
    add,
    textDelete,
    notFound,
    count,
    labels,
    label: textDelete,
    okText,
    cancelText,
    customerLabels,
    productLabels,
  }
}

export async function getOptions() {
  return {}
}
