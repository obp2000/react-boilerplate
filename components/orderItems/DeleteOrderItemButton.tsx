import Button from "@/client/Button"
import { useDeleteButton } from './hooks'

export default function DeleteOrderItemButton(props: { index: number }) {
  return <Button {...useDeleteButton(props)} />
}
