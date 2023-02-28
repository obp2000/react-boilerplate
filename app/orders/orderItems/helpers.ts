// import { FieldArrayRenderProps } from 'react-final-form-arrays'
import { Values } from '../calculator'
import initOrderItem from './orderItem.json'

export function deleteOrderItem({
  index,
  remove,
  label,
  okText,
  cancelText,
  busy,
}: { index: number, label: string, okText: string, cancelText: string, busy: boolean }) {
  if (busy) { return }
  return async () => {
    const confirm = (await import('@/app/confirmation/Confirmation')).confirm
    const result = await confirm(`${label}?`, { okText, cancelText })
    if (result) {
      // fields.update(index, initOrderItem as Values['orderItems'])
      remove(index)
    }
  }
}

// Omit<FieldArrayRenderProps<Values['orderItems'], HTMLElement>, 'meta'>