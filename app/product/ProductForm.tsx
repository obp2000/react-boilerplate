import type { ProductFormProps } from '@/interfaces/products'
import Form from './Form'

export default function FormComp(props: ProductFormProps) {
  return <Form {...props} />
}
