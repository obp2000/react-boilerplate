import { createReducer } from 'redux-act'
import { createSelector } from 'reselect'
// import config from '../Config'
import { createCommonSlice } from './CommonActions'
// import { test1, createCommonSlice } from './test1'
// import { selectOptions } from './CommonConsts'
import { ShortName } from '../customers/CustomerName'
import CityName from '../cities/CityName'
import { selectShortLabels, cityLabels } from '../redux/Cities'
import { useOptions } from '../../services/apiSlice'

export const initCity = {
    city: '',
    pindex: ''
}

export const initObject = {
    nick: '',
    name: '',
    city: initCity,
    address: ''
}

const index_url = '/customers/'
const redirect_url = '/customers/'
const pre_submit_action = values => {
    if (values.city) {
        values.city_id = values.city.id
        delete values.city
    }
    delete values.options
    delete values.created_at
    delete values.updated_at
}

// const config = {
//     initObject,
//     index_url
// }

// console.log('createCommonSlice customers ', createCommonSlice)

const Slice = createCommonSlice(initObject)
export const Actions = Slice.actions
export default Slice.reducer

// console.log('Actions: ', Actions)

// export const Actions = createActions()

// export default createReducer(reducerActions(Actions, initObject),
//     initialState(initObject))

Actions.initObject = initObject
Actions.index_url = index_url
// Actions.base_url = `${config.BACKEND}/api${index_url}`
Actions.redirect_url = redirect_url

Actions.pre_submit_action = pre_submit_action
Actions.search_url = index_url

export const selectSlice = ({ customers }) => customers

export const selectCityProps =
    createSelector([useOptions], ({
        city: {
            children = {}
        } = {}
    }) => children)

export const selectObject =
    createSelector([selectSlice], ({
        object
    }) => object)

export const selectObjects =
    createSelector([selectSlice], ({
        results
    }) => results)

export const selectCustomerLabels = selectCustomerProps =>
    createSelector([selectCustomerProps],
        ({
            name: {
                label: name_label = ''
            } = {},
            address: {
                label: address_label = ''
            } = {}
        }) => ({
            name_label: `${name_label}:`,
            address_label: `${address_label}:`
        })
    )

export const selectTableLabels =
    createSelector([useOptions], ({
        id = {},
        name = {},
        city = {},
        address = {},
        created_at = {}
    }) => [
        id.label,
        name.label,
        city.label,
        address.label,
        created_at.label
    ])

export const selectTableValues = results =>
    createSelector([
            selectCustomerLabels(useOptions),
            selectShortLabels(selectCityProps),
            selectTableLabels
        ],
        (
            customer_labels,
            city_labels,
            table_labels
        ) => results.reduce((result, object) => {
            result.push({
                id: object.id,
                name: ShortName(object, customer_labels),
                city: CityName(object.city, city_labels),
                address: object.address,
                created_at: object.created_at,
            })
            return result
        }, [table_labels])
    )


// export const getTableLabels = ({
//     id = {},
//     name = {},
//     city = {},
//     address = {},
//     created_at = {}
// }) => [id.label,
//     name.label,
//     city.label,
//     address.label,
//     created_at.label
// ]

export const tableFieldNames = [
    'id',
    'name',
    'city',
    'address',
    'created_at'
]

export const customerLabels = ({ name, address }) =>
    ({
        name_label: `${name?.label}:`,
        address_label: `${address?.label}:`
    })


// export const tableData = (object, options) => [
//     {
//         label: options?.id.label,
//         value: object.id
//     },
//     {
//         label: options?.name.label,
//         value: ShortName(object, customerLabels(options)),
//     },
//     {
//         label: options?.city.label,
//         value: CityName(object.city, cityLabels(options?.city.children))
//     },
//     {
//         label: options?.address.label,
//         value: object.address
//     },
//     {
//         label: options?.created_at.label,
//         value: object.created_at
//     },
// ]

export const rowData = (object, options) => [
    object.id,
    ShortName(object, customerLabels(options)),
    CityName(object.city, cityLabels(options?.city?.children)),
    object.address,
    object.created_at
]
