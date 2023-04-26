import type { OrderFormProps } from '@/interfaces/orders'
import Form from './Form'

export default function FormComp(props: OrderFormProps) {
  return <Form {...props} />
}
