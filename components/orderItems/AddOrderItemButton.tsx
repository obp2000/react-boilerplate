import Button from '@/client/Button'
import { useAddButton } from './hooks'

export default function AddOrderItemButton() {
  return <Button {...useAddButton()} />
}
