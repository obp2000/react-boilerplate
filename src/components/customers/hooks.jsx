import React from 'react'
import createDecorator from 'final-form-submit-listener'
import {
  getCustomers as getObjects,
  useGetCustomerQuery as useGetObjectQuery,
  useCreateCustomerMutation as useCreateObjectMutation,
  useUpdateCustomerMutation as useUpdateObjectMutation,
  useDeleteCustomerMutation as useDeleteObjectMutation,
} from './apiSlice'
import ObjectFormRender from './CustomerFormRender'
import {validate} from './Validators'
import {useObjectsTable} from '../objectsTable/hooks'
import {useObjectForm} from '../objectForm/hooks'
import CustomerName from './CustomerName'
import {useDropdown as useCityDropdownAttrs} from '../cities/hooks'
import CityName from '../cities/CityName'
import {useCityName} from '../cities/hooks'
import ShortName from './ShortName'
import DropdownListFormGroup from '../dropdownList/DropdownListFormGroup'

const emptyObject = {}

export const indexUrl = '/customers/'

export const customerCityOptions = ({
  city: {
    children,
  } = emptyObject,
} = emptyObject) => children

export const useAddress = ({
  address,
  options,
}) => ({
  address,
  label: options?.address?.label,
})

export const useName = ({
  name,
  options,
}) => ({
  name,
  label: options?.name?.label,
})

export const useShortName = ({
  nick,
  options,
  ...customer
}) => ({
  nick,
  nameProps: {...customer, options},
})

export const useCustomerName = ({
  city,
  options,
  ...customer
}) => ({
  shortNameProps: {...customer, options},
  cityNameProps: {...city, options: customerCityOptions(options)},
  addressProps: {...customer, options},
})

export const useCityDropdown = ({commonConsts, options}) => ({
  ...useCityDropdownAttrs(customerCityOptions(options)),
  component: DropdownListFormGroup,
  commonConsts,
  options,
})

const tableFieldNames = [
  'id',
  'name',
  'city',
  'address',
  'created_at',
]

const useTableFieldValues = ({
  id,
  city,
  address,
  created_at,
  ...customer
} = emptyObject,
options
) => [
  id,
  <ShortName {...customer} options={options} key={id} />,
  <CityName {...city} options={customerCityOptions(options)} key={id} />,
  address,
  created_at,
]

export const useCustomersTable = () => {
  // console.log({props})
  const tableProps = useObjectsTable({getObjects, indexUrl})
  return {
    indexUrl,
    tableFieldNames,
    useDeleteObjectMutation,
    useTableFieldValues,
    ...tableProps,
  }
}

const deleteValues = [
  'city',
]

const preSubmitAction = (values) => {
  // console.log('values ', values)
  // console.log('values.city ', values.city)
  values.city_id = values.city?.id
  deleteValues.map((deleteValue) => {
    delete values[deleteValue]
  })
}

const submitListener = createDecorator({
  beforeSubmit: (form) => {
    preSubmitAction(form.getState().values)
  },
})

const formInitialValues = ({
  created_at,
  updated_at,
  ...rest
} = emptyObject) => rest

const formDecorators = (options) => [submitListener]

export const useCustomerForm = () => {
  const mutators = emptyObject
  const formAttrs = useObjectForm({
    indexUrl,
    useGetObjectQuery,
    formInitialValues,
    formDecorators,
    validate,
    useUpdateObjectMutation,
    useCreateObjectMutation,
  })
  return {
    mutators,
    render: ObjectFormRender,
    ...formAttrs,
  }
}

const dropdownListTextField = ({
  nick,
  name,
  city: {
    pindex,
    city,
  } = {},
  address,
}) => [nick, name, pindex, city, address]

export const useDropdown = (options) => ({
  textField: dropdownListTextField,
  dataKey: 'id',
  searchPath: indexUrl,
  renderValue: ({item}) => <CustomerName {...item} options={options} />,
})


