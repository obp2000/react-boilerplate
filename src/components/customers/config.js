import createDecorator from 'final-form-submit-listener'
import {shortName} from './name'
import {customerCityOptions, customerLabels} from './options'
import cityName from '../cities/name'
import { cityLabels } from '../cities/options'
import CustomerFormRender from './CustomerFormRender'
import { validate } from './Validators'
import {
    getCustomers,
    useGetCustomerQuery,
    useLazyGetCustomerQuery,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} from './apiSlice'

const indexUrl = '/customers/'

const redirectUrl = '/customers/'

const searchUrl = indexUrl

const preSubmitAction = (values) => {
    if (values.city) {
        values.city_id = values.city.id
        delete values.city
    }
    delete values.options
    delete values.created_at
    delete values.updated_at
}

const tableFieldNames = [
    'id',
    'name',
    'city',
    'address',
    'created_at',
]

const rowData = ({
    id,
    city,
    address,
    created_at,
    ...restObject
} = {},
options) => [
    id,
    shortName(restObject, customerLabels(options)),
    cityName(city, cityLabels(customerCityOptions(options))),
    address,
    created_at,
]

const formInitialValues = (object) => object

const submitListener = createDecorator({
    beforeSubmit: (form) => {
        // console.log('pre.....')
        preSubmitAction(form.getState().values)
    },
})

const config = {
    indexUrl,
    redirectUrl,
    decorators: [submitListener],
    searchUrl,
    tableFieldNames,
    rowData,
    ObjectFormRender: CustomerFormRender,
    validate,
    formInitialValues,
    getObjects: getCustomers,
    useGetObjectQuery: useGetCustomerQuery,
    useLazyGetObjectQuery: useLazyGetCustomerQuery,
    useCreateObjectMutation: useCreateCustomerMutation,
    useUpdateObjectMutation: useUpdateCustomerMutation,
    useDeleteObjectMutation: useDeleteCustomerMutation,
}

export default config
