import type { CustomerFormProps } from '@/interfaces/customers'
import Form from './Form'

export default function FormComp(props: CustomerFormProps) {
  return <Form {...props} />
}
