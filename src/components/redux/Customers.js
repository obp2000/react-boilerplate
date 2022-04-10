import { createReducer } from 'redux-act'
import { createSelector } from 'reselect'
import config from '../Config'
import { createActions, reducerActions, initialState } from './CommonActions'
import { selectOptions } from './CommonConsts'
import { ShortName } from '../customers/CustomerName'
import CityName from '../cities/CityName'
import { selectShortLabels } from '../redux/Cities'

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

const index_url = '/customers'
const redirect_url = '/customers'
const pre_submit_action = values => {
    if (values.city) {
        values.city_id = values.city.id
        delete values.city
    }
    delete values.options
    delete values.created_at
    delete values.updated_at
}

export const Actions = createActions()

export default createReducer(reducerActions(Actions, initObject),
    initialState(initObject))

Actions.index_url = index_url
Actions.base_url = `${config.BACKEND}/api${index_url}`
Actions.redirect_url = redirect_url
Actions.initObject = initObject
Actions.pre_submit_action = pre_submit_action
Actions.search_url = index_url

export const selectCityProps = ({
    common_consts: {
        options: {
            city: {
                children = {}
            } = {}
        } = {}
    }
}) => children

export const selectObject = ({
    customers: {
        object
    }
}) => object

export const selectCustomerLabels = selectCustomerProps =>
    createSelector([selectCustomerProps],
        ({
            name = {},
            address = {}
        }) => {
            const {
                label: name_label = ''
            } = name
            const {
                label: address_label = ''
            } = address
            return {
                name_label: `${name_label}:`,
                address_label: `${address_label}:`
            }
        }
    )

export const selectObjects = ({
    customers: {
        results = {}
    } = {}
}) => results

export const selectTableValues =
    createSelector([selectObjects, selectCustomerLabels(selectOptions), selectShortLabels(selectCityProps)],
        (objects, customer_labels, city_labels) => {
            return objects.reduce((result, object) => {
                result.push({
                    id: object.id,
                    name: ShortName(object, customer_labels),
                    city: CityName(object.city, city_labels),
                    address: object.address,
                    created_at: object.created_at,
                })
                return result
            }, [])
        }
    )

export const selectTableLabels =
    createSelector([selectOptions], ({
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


export const selectTotalCount = ({
    customers: {
        totalCount = 0
    } = {}
}) => totalCount

export const selectTotalPages = ({
    customers: {
        totalPages = 0
    } = {}
}) => totalPages


// ['username', 'email', 'first_name', 'last_name'].reduce(
//     (fields, field_name) => {
//         fields.push({
//             label: options[field_name] && options[field_name].label,
//             value: object[field_name]
//         })
//         return fields
//     }, [])

// export const TableData = {
//
// }

// export Actions

// export const Actions = new CommonActions({
//     index_url,
//     redirect_url,
//     initObject,
//     pre_submit_action
// })

// export const getObjectsAction = getObjectsAction1(Actions)
// export const getObjectAction = getObjectAction1(Actions)
// export const getObjectsAction = Actions.getObjectsAction()
// export const getObjectAction = Actions.getObjectAction()
// export const onSubmit = Actions.onSubmitAction()
// export const deleteObjectAction = Actions.deleteObjectAction()
// export const onSearch = Actions.searchObjectsAction()
// export const onBlur = Actions.clearSearchObjectsAction()