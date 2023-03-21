import type { UseFieldArrayRemove } from 'react-hook-form'

export function deleteOrderItem({
  index,
  remove,
  label,
  okText,
  cancelText,
}: {
  index: number
  remove: UseFieldArrayRemove
  label: string
  okText: string
  cancelText: string
}) {
  return async () => {
    const confirm = (await import('@/app/confirmation/Confirmation')).confirm
    const result = await confirm(`${label}?`, { okText, cancelText })
    if (result) {
      // fields.update(index, initOrderItem as Values['orderItems'])
      remove(index)
    }
  }
}
