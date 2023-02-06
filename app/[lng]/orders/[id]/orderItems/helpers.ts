import { FieldArrayRenderProps } from 'react-final-form-arrays'
import { Values } from '../calculator'
import initOrderItem from './initOrderItem.json'

export function deleteOrderItem({
  index,
  fields,
  label,
  okText,
  cancelText,
  busy,
}: Omit<FieldArrayRenderProps<Values['orderItems'], HTMLElement>, 'meta'> &
  { index: number, label: string, okText: string, cancelText: string, busy: boolean }) {
  if (busy) { return }
  return async () => {
    const confirm = (await import('@/confirmation/Confirmation')).confirm
    const result = await confirm(`${label}?`,
      { okText, cancelText })
    if (result) {
      fields.update(index, initOrderItem as Values['orderItems'])
      fields.remove(index)
    }
  }
}
