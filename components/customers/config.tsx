import objectFormRender from './CustomerFormRender'
import TableLabels from './TableLabels'
import TableRow from './TableRow'
import { useFormInitialValues } from './hooks'
import type { Customer } from '@/interfaces/customers'

export const objectsTableConfig = {
  TableRow,
  TableLabels,
}

const validatedFields = {
  notBlank: ['nick'],
}

export const modFormValues = ({
  id,
  city,
  created_at,
  updated_at,
  ...values
}: Customer): Partial<Customer> => {
  if (city) {
    values.city_id = city.id
  }
  return values
}

export const objectFormConfig = {
  useFormInitialValues,
  objectFormRender,
  validatedFields,
  modFormValues,
}
