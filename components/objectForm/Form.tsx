import { Form } from 'react-final-form'
import type {
  FormConfig as CustomerFormConfig
} from '../../interfaces/customers'
import type {
  FormConfig as OrderFormConfig
} from '../../interfaces/orders'
import type {
  FormConfig as ProductFormConfig
} from '../../interfaces/products'
import { useObjectForm } from './hooks'

function FormComp(props: CustomerFormConfig): JSX.Element
function FormComp(props: ProductFormConfig): JSX.Element
function FormComp(props: OrderFormConfig): JSX.Element
function FormComp(props: any): JSX.Element {
  return <Form {...useObjectForm(props)} />
}

export default FormComp
