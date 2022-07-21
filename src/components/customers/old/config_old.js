import createDecorator from 'final-form-submit-listener'
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
// import ObjectsTableRow from './ObjectsTableRow'

const emptyObject = {}

const indexUrl = '/customers/'

const redirectUrl = '/customers/'

const searchUrl = indexUrl

const deleteValues = [
    'city',
    'options',
    'created_at',
    'updated_at',
]

const preSubmitAction = (values) => {
    if (values.city) {
        values.city_id = values.city.id
    }
    deleteValues.map((deleteValue) => {
        delete values[deleteValue]
    })
}

const tableFieldNames = [
    'id',
    'name',
    'city',
    'address',
    'created_at',
]

const formInitialValues = (object) => object

const submitListener = createDecorator({
    beforeSubmit: (form) => {
        // console.log('pre.....')
        preSubmitAction(form.getState().values)
    },
})

const dropdownListTextField = ({
    nick,
    name,
    city: {
        pindex,
        city,
    } = {},
    address
}) => [nick, name, pindex, city, address]

const config = {
    indexUrl,
    redirectUrl,
    decorators: [submitListener],
    searchUrl,
    tableFieldNames,
    ObjectsTableRow,
    ObjectFormRender: CustomerFormRender,
    validate,
    formInitialValues,
    getObjects: getCustomers,
    useGetObjectQuery: useGetCustomerQuery,
    useLazyGetObjectQuery: useLazyGetCustomerQuery,
    useCreateObjectMutation: useCreateCustomerMutation,
    useUpdateObjectMutation: useUpdateCustomerMutation,
    useDeleteObjectMutation: useDeleteCustomerMutation,
    dropdownListTextField,
}

export default config
