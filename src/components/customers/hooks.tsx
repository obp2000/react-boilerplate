import createDecorator from 'final-form-submit-listener'
import type {Decorator} from 'final-form'
import type {FormProps} from 'react-final-form'
import {
  getCustomers as getObjects,
  useGetCustomerQuery as useGetObjectQuery,
  useCreateCustomerMutation as useCreateObjectMutation,
  useUpdateCustomerMutation as useUpdateObjectMutation,
  useDeleteCustomerMutation as useDeleteObjectMutation,
} from './apiSlice'
import objectFormRender from './CustomerFormRender'
import {validate} from './Validators'
import CustomerName from './CustomerName'
import TableRow from './tableRow'
import TableLabels from './tableLabels'
import {
  CityOptions,
  Customer,
  CustomerFormValues,
  CustomerCityOptions,
  CustomerOptions,
} from '../../../interfaces'
// import {GetObjectsEndpoint} from '../../services/entityAdapter'

// const emptyObject = {}

export const indexUrl = '/customers/'

// type CustomerCityOptionsProps = {
//   city: CustomerCityOptions
// }

// export const customerCityOptions = (
//   options: Test1): CityOptions => options?.city.children

export type CustomersTableConfig = {
  indexUrl: string
  getObjects: typeof getObjects
  TableRow: typeof TableRow
  TableLabels: typeof TableLabels
  useDeleteObjectMutation: typeof useDeleteObjectMutation
}

export const objectsTableConfig = {
  indexUrl,
  getObjects,
  TableRow,
  TableLabels,
  useDeleteObjectMutation,
}

export const calculatedFields = []

const deleteValues = [
  'city',
  'created_at',
  'updated_at',
]

const preSubmitAction = (values: CustomerFormValues): void => {
  values.city_id = values.city?.id
  deleteValues.map((deleteValue) => {
    delete values[deleteValue as keyof CustomerFormValues]
  })
}

const submitListener: Decorator = createDecorator({
  beforeSubmit: (form: FormProps): void => {
    preSubmitAction(form.getState().values)
  },
})

const formInitialValues = (
  object: Customer
): CustomerFormValues => {
  let objectValues: CustomerFormValues = object
  return objectValues
}

const formDecorators = () => [submitListener]

const mutators = {}

export const objectFormConfig = {
  indexUrl,
  useGetObjectQuery,
  formInitialValues,
  formDecorators,
  mutators,
  validate,
  useUpdateObjectMutation,
  useCreateObjectMutation,
  objectFormRender,
  calculatedFields,
}

const dropdownListTextField = ({
  nick,
  name,
  city,
  address,
}: Customer): string[] => [
  String(nick),
  String(name),
  String(city?.pindex),
  String(city?.city),
  String(address)
]

export const useDropdown = (options: CustomerOptions) => ({
  textField: dropdownListTextField,
  dataKey: 'id',
  searchPath: indexUrl,
  renderValue: ({item}: {item: Customer}): JSX.Element =>
    <CustomerName object={item} options={options} />,
})
